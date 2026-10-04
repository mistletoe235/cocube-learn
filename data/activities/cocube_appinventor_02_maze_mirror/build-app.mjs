import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const activity = path.dirname(new URL(import.meta.url).pathname);
const source = path.resolve(activity, '../cocube_appinventor_01_control/files/CoCubeControlLearn.aia');
const output = path.join(activity, 'files/CoCubeMazeMirror.aia');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cocube-maze-aia-'));
let identifier = 0;
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const block = (type, content) => `<block type="${type}" id="maze_${++identifier}">${content}</block>`;
const field = (name, value) => `<field name="${name}">${escape(value)}</field>`;
const value = (name, content) => `<value name="${name}">${content}</value>`;
const text = content => block('text', field('TEXT', content));
const number = content => block('math_number', field('NUM', content));
const eventParameter = name => block('lexical_variable_get', `<mutation xmlns="http://www.w3.org/1999/xhtml"><eventparam name="${name}"></eventparam></mutation>${field('VAR', name)}`);
const component = (type, instance, property, mode, content) => block('component_set_get', `<mutation xmlns="http://www.w3.org/1999/xhtml" component_type="${type}" set_or_get="${mode}" property_name="${property}" is_generic="false" instance_name="${instance}"></mutation>${field('COMPONENT_SELECTOR', instance)}${field('PROP', property)}${mode === 'set' ? value('VALUE', content) : ''}`);
const method = (type, instance, name, args = [], next = '') => block('component_method', `<mutation xmlns="http://www.w3.org/1999/xhtml" component_type="${type}" method_name="${name}" is_generic="false" instance_name="${instance}"></mutation>${field('COMPONENT_SELECTOR', instance)}${args.map((arg, index) => value(`ARG${index}`, arg)).join('')}${next ? `<next>${next}</next>` : ''}`);
const status = (label, next = '') => block('component_set_get', `<mutation xmlns="http://www.w3.org/1999/xhtml" component_type="Label" set_or_get="set" property_name="Text" is_generic="false" instance_name="LocationLabel"></mutation>${field('COMPONENT_SELECTOR', 'LocationLabel')}${field('PROP', 'Text')}${value('VALUE', label)}${next ? `<next>${next}</next>` : ''}`);
const item = index => block('lists_select_item', value('LIST', block('text_split', `${field('OP', 'SPLITAT')}${value('TEXT', eventParameter('message'))}${value('AT', text(','))}`)) + value('NUM', number(index)));
const join = (...parts) => block('text_join', `<mutation xmlns="http://www.w3.org/1999/xhtml" items="${parts.length}"></mutation>${parts.map((part, index) => value(`ADD${index}`, part)).join('')}`);
const draw = method('Canvas', 'MapCanvas', 'DrawCircle', [item(2), item(3), number(5), block('logic_boolean', field('BOOL', 'TRUE'))]);
const onMap = method('Canvas', 'MapCanvas', 'Clear', [], status(join(text('X: '), item(2), text('    Y: '), item(3)), draw));
const offMap = method('Canvas', 'MapCanvas', 'Clear', [], status(text('Place CoCube on the maze map')));
const containsPosition = block('logic_compare', `${field('OP', 'EQ')}${value('A', item(1))}${value('B', text('pos'))}`);
const positionIf = block('controls_if', `${value('IF0', containsPosition)}<statement name="DO0">${onMap}</statement>`);

try {
  execFileSync('unzip', ['-q', source, '-d', temp]);
  const projectRoot = path.join(temp, 'src/appinventor');
  const account = fs.readdirSync(projectRoot)[0];
  const oldDir = path.join(projectRoot, account, 'CoCubeControlLearn');
  const newDir = path.join(projectRoot, account, 'CoCubeMazeMirror');
  fs.renameSync(oldDir, newDir);

  const screenPath = path.join(newDir, 'Screen1.scm');
  const screenText = fs.readFileSync(screenPath, 'utf8');
  const json = JSON.parse(screenText.slice(screenText.indexOf('{'), screenText.lastIndexOf('}') + 1));
  const form = json.Properties;
  form.AppName = 'CoCubeMazeMirror';
  form.Title = 'CoCube Maze Mirror';
  const controls = form.$Components;
  const afterStatus = controls.findIndex(control => control.$Name === 'StatusLabel') + 1;
  controls.splice(afterStatus, 0,
    { $Name: 'MapCanvas', $Type: 'Canvas', $Version: '15', BackgroundImage: 'maze-map.png', Height: '200', Width: '300', PaintColor: '&HFFE53935', Uuid: '27001001' },
    { $Name: 'LocationLabel', $Type: 'Label', $Version: '6', Text: 'Place CoCube on the maze map', Uuid: '27001002' });
  fs.writeFileSync(screenPath, `#|\n$JSON\n${JSON.stringify(json)}\n|#`);

  const blocksPath = path.join(newDir, 'Screen1.bky');
  const blocksText = fs.readFileSync(blocksPath, 'utf8');
  fs.writeFileSync(blocksPath, blocksText.replace('<yacodeblocks ', `<block type="component_event" id="maze_receiver" x="930" y="40"><mutation xmlns="http://www.w3.org/1999/xhtml" component_type="MicroBlocks" is_generic="false" instance_name="MicroBlocks1" event_name="MicroBlocksMessageReceived"></mutation>${field('COMPONENT_SELECTOR', 'MicroBlocks1')}<statement name="DO">${block('controls_if', `<mutation xmlns="http://www.w3.org/1999/xhtml" else="1"></mutation>${value('IF0', block('logic_compare', `${field('OP', 'EQ')}${value('A', eventParameter('message'))}${value('B', text('off-map'))}`))}<statement name="DO0">${offMap}</statement><statement name="ELSE">${positionIf}</statement>`)}</statement></block><yacodeblocks `));

  fs.copyFileSync(path.join(activity, 'files/maze-map.png'), path.join(temp, 'assets/maze-map.png'));
  const properties = path.join(temp, 'youngandroidproject/project.properties');
  fs.writeFileSync(properties, fs.readFileSync(properties, 'utf8').replaceAll('CoCubeControlLearn', 'CoCubeMazeMirror'));
  fs.rmSync(output, { force: true });
  execFileSync('zip', ['-q', '-D', '-r', output, 'assets', 'src', 'youngandroidproject'], { cwd: temp });
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
