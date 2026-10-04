import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const activity = path.dirname(new URL(import.meta.url).pathname);
const source = path.resolve(activity, '../cocube_appinventor_01_control/files');
const output = path.join(activity, 'files');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cocube-remote-'));
let identifier = 0;
const escape = content => String(content).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const field = (name, content) => `<field name="${name}">${escape(content)}</field>`;
const value = (name, content) => `<value name="${name}">${content}</value>`;
const statement = (name, content) => `<statement name="${name}">${content}</statement>`;
const block = (type, content, next = '') => `<block type="${type}" id="remote_${++identifier}">${content}${next ? `<next>${next}</next>` : ''}</block>`;
const text = content => block('text', field('TEXT', content));
const number = content => block('math_number', field('NUM', content));
const boolean = content => block('logic_boolean', field('BOOL', content ? 'TRUE' : 'FALSE'));
const global = name => block('lexical_variable_get', field('VAR', `global ${name}`));
const local = name => block('lexical_variable_get', `<mutation xmlns="http://www.w3.org/1999/xhtml"><eventparam name="${name}"></eventparam></mutation>${field('VAR', name)}`);
const setGlobal = (name, content, next = '') => block('lexical_variable_set', `${field('VAR', `global ${name}`)}${value('VALUE', content)}`, next);
const arithmetic = (operation, left, right) => block({ ADD: 'math_add', MINUS: 'math_subtract', DIVIDE: 'math_division' }[operation], operation === 'ADD' ? `<mutation xmlns="http://www.w3.org/1999/xhtml" items="2"></mutation>${value('NUM0', left)}${value('NUM1', right)}` : `${value('A', left)}${value('B', right)}`);
const round = content => block('math_round', value('NUM', content));
const join = (...parts) => block('text_join', `<mutation xmlns="http://www.w3.org/1999/xhtml" items="${parts.length}"></mutation>${parts.map((part, index) => value(`ADD${index}`, part)).join('')}`);
const component = (type, name, property, content, next = '') => block('component_set_get', `<mutation xmlns="http://www.w3.org/1999/xhtml" component_type="${type}" set_or_get="set" property_name="${property}" is_generic="false" instance_name="${name}"></mutation>${field('COMPONENT_SELECTOR', name)}${field('PROP', property)}${value('VALUE', content)}`, next);
const method = (type, name, methodName, args = [], next = '') => block('component_method', `<mutation xmlns="http://www.w3.org/1999/xhtml" component_type="${type}" method_name="${methodName}" is_generic="false" instance_name="${name}"></mutation>${field('COMPONENT_SELECTOR', name)}${args.map((arg, index) => value(`ARG${index}`, arg)).join('')}`, next);
const send = (content, next = '') => method('MicroBlocks', 'MicroBlocks1', 'SendMessage', [content], next);
const event = (name, type, kind, body, x, y) => `<block type="component_event" id="remote_${++identifier}" x="${x}" y="${y}"><mutation xmlns="http://www.w3.org/1999/xhtml" component_type="${type}" is_generic="false" instance_name="${name}" event_name="${kind}"></mutation>${field('COMPONENT_SELECTOR', name)}${statement('DO', body)}</block>`;
const globalDeclaration = (name, content, y) => `<block type="global_declaration" id="remote_global_${name}" x="30" y="${y}">${field('NAME', name)}${value('VALUE', content)}</block>`;
const actionButtons = ['AButton', 'BButton', 'XButton', 'YButton', 'StopButton'];
const enabledButtons = (enabled, next = '') => actionButtons.reduceRight((chain, name) => component('Button', name, 'Enabled', boolean(enabled), chain), next);
const wheelMessage = () => join(text('wheel,'), global('leftSpeed'), text(','), global('rightSpeed'));
const sendStop = (next = '') => setGlobal('active', boolean(false), setGlobal('leftSpeed', number(0), setGlobal('rightSpeed', number(0), block('controls_if', `${value('IF0', global('connected'))}${statement('DO0', send(text('stop')))}`, next))));
const draw = (x, y, next = '') => method('Canvas', 'JoystickCanvas', 'Clear', [], method('Canvas', 'JoystickCanvas', 'DrawCircle', [x, y, number(12), boolean(true)], next));
const wheelSpeed = (vertical, horizontal, operation) => round(arithmetic('DIVIDE', arithmetic(operation, vertical, horizontal), number(4)));
const updateStick = (x, y) => {
  const vertical = arithmetic('MINUS', number(100), y);
  const horizontal = arithmetic('MINUS', x, number(100));
  return setGlobal('leftSpeed', wheelSpeed(vertical, horizontal, 'ADD'),
    setGlobal('rightSpeed', wheelSpeed(vertical, horizontal, 'MINUS'),
      setGlobal('active', boolean(true), draw(x, y, send(wheelMessage())))));
};

try {
  execFileSync('unzip', ['-q', path.join(source, 'CoCubeControlLearn.aia'), '-d', temp]);
  const authorRoot = path.join(temp, 'src/appinventor');
  const author = fs.readdirSync(authorRoot)[0];
  const oldDir = path.join(authorRoot, author, 'CoCubeControlLearn');
  const newDir = path.join(authorRoot, author, 'CoCubeRemote');
  fs.renameSync(oldDir, newDir);

  const screenPath = path.join(newDir, 'Screen1.scm');
  const screenText = fs.readFileSync(screenPath, 'utf8');
  const screen = JSON.parse(screenText.slice(screenText.indexOf('{'), screenText.lastIndexOf('}') + 1));
  screen.Properties.AppName = 'CoCubeRemote';
  screen.Properties.Title = 'CoCube Remote';
  const button = (name, label) => ({ $Name: name, $Type: 'Button', $Version: '8', Enabled: 'False', Text: label, Width: '76', Height: '44', Uuid: String(4000100 + ++identifier) });
  const row = (name, components) => ({ $Name: name, $Type: 'HorizontalArrangement', $Version: '4', AlignHorizontal: '3', $Components: components, Uuid: String(4000100 + ++identifier) });
  screen.Properties.$Components.splice(3, 2,
    { $Name: 'HelpLabel', $Type: 'Label', $Version: '6', Text: 'Drag the joystick. Release to stop.', Uuid: '4000200' },
    { $Name: 'JoystickCanvas', $Type: 'Canvas', $Version: '15', BackgroundImage: 'joystick.png', Width: '200', Height: '200', PaintColor: '&HFFFC553A', Uuid: '4000201' },
    row('TopButtons', [button('XButton', 'X'), button('YButton', 'Y')]),
    row('BottomButtons', [button('AButton', 'A'), button('BButton', 'B')]),
    button('StopButton', 'STOP'));
  screen.Properties.$Components.push({ $Name: 'Clock1', $Type: 'Clock', $Version: '4', TimerAlwaysFires: 'False', TimerInterval: '150', Uuid: '4000202' });
  fs.writeFileSync(screenPath, `#|\n$JSON\n${JSON.stringify(screen)}\n|#`);

  const blocksPath = path.join(newDir, 'Screen1.bky');
  const blocksText = fs.readFileSync(blocksPath, 'utf8');
  const connect = blocksText.slice(blocksText.indexOf('<block type="component_event"'), blocksText.indexOf('<block type="component_event"', blocksText.indexOf('<block type="component_event"') + 1));
  if (!connect.includes('ConnectButton')) throw new Error('Cannot find Connect button blocks');
  const onConnected = setGlobal('connected', boolean(true), component('Label', 'StatusLabel', 'Text', text('Connected'), enabledButtons(true)));
  const onDisconnected = setGlobal('connected', boolean(false), setGlobal('active', boolean(false), component('Label', 'StatusLabel', 'Text', text('Disconnected'), enabledButtons(false))));
  const connectChanged = block('controls_if', `<mutation xmlns="http://www.w3.org/1999/xhtml" else="1"></mutation>${value('IF0', local('isConnected'))}${statement('DO0', onConnected)}${statement('ELSE', onDisconnected)}`);
  const onlyWhileConnected = body => block('controls_if', `${value('IF0', global('connected'))}${statement('DO0', body)}`);
  const events = [
    event('MicroBlocks1', 'MicroBlocks', 'ConnectionChanged', connectChanged, 35, 180),
    event('JoystickCanvas', 'Canvas', 'Touched', onlyWhileConnected(updateStick(local('x'), local('y'))), 500, 40),
    event('JoystickCanvas', 'Canvas', 'Dragged', onlyWhileConnected(updateStick(local('currentX'), local('currentY'))), 500, 470),
    event('JoystickCanvas', 'Canvas', 'TouchUp', sendStop(draw(number(100), number(100))), 500, 900),
    event('StopButton', 'Button', 'Click', sendStop(draw(number(100), number(100))), 850, 900),
    event('Clock1', 'Clock', 'Timer', block('controls_if', `${value('IF0', global('active'))}${statement('DO0', send(wheelMessage()))}`), 35, 700),
    event('Screen1', 'Form', 'Initialize', draw(number(100), number(100)), 35, 900)
  ];
  for (const [index, letter] of ['a', 'b', 'x', 'y'].entries()) {
    events.push(event(`${letter.toUpperCase()}Button`, 'Button', 'Click', send(text(letter)), 1150, 40 + index * 175));
  }
  const globals = ['connected', 'active', 'leftSpeed', 'rightSpeed'].map((name, index) => globalDeclaration(name, index < 2 ? boolean(false) : number(0), 80 + index * 120)).join('');
  fs.writeFileSync(blocksPath, `<xml xmlns="https://developers.google.com/blockly/xml">${connect}${globals}${events.join('')}<yacodeblocks xmlns="https://appinventor.mit.edu/ns/project/" ya-version="237" language-version="39"/></xml>`);

  const properties = path.join(temp, 'youngandroidproject/project.properties');
  fs.writeFileSync(properties, fs.readFileSync(properties, 'utf8').replaceAll('CoCubeControlLearn', 'CoCubeRemote'));
  fs.mkdirSync(output, { recursive: true });
  fs.copyFileSync(path.join(output, 'joystick.png'), path.join(temp, 'assets/joystick.png'));
  const aia = path.join(output, 'CoCubeRemote.aia');
  fs.rmSync(aia, { force: true });
  execFileSync('zip', ['-q', '-D', '-r', aia, 'assets', 'src', 'youngandroidproject'], { cwd: temp });

  const original = fs.readFileSync(path.join(source, 'CoCubeControlLearn.ubp'), 'utf8');
  const modules = original.slice(original.indexOf("module '8 Bit Graphics'"));
  const robot = `projectName 'CoCubeRemote'\n\nmodule main\nauthor unknown\nversion 1 0 \ndescription ''\nvariables leftSpeed rightSpeed ticksSinceCommand \n\nscript 40 40 {\nwhenStarted\nleftSpeed = 0\nrightSpeed = 0\nticksSinceCommand = 4\nforever {\n  if (not ('[ble:bleConnected]')) {\n    leftSpeed = 0\n    rightSpeed = 0\n  }\n  if (ticksSinceCommand >= 4) {\n    leftSpeed = 0\n    rightSpeed = 0\n  }\n  if (and (leftSpeed == 0) (rightSpeed == 0)) {\n    'CoCube wheels break'\n  } else {\n    'CoCube set wheel' leftSpeed rightSpeed\n  }\n  waitMillis 100\n  ticksSinceCommand = (ticksSinceCommand + 1)\n}\n}\n\nscript 430 40 {\nwhenBroadcastReceived ''\nlocal 'parts' ('[data:split]' (getLastBroadcast) ',')\nif (and ((size parts) == 3) ((at 1 parts) == 'wheel')) {\n  leftSpeed = ('[data:convertType]' (at 2 parts) 'number')\n  rightSpeed = ('[data:convertType]' (at 3 parts) 'number')\n  ticksSinceCommand = 0\n}\n}\n\nscript 430 230 {\nwhenBroadcastReceived 'stop'\nleftSpeed = 0\nrightSpeed = 0\nticksSinceCommand = 4\n'CoCube wheels break'\n}\n\nscript 750 40 {\nwhenBroadcastReceived 'a'\nled_displayImage 'happy'\n}\n\nscript 750 160 {\nwhenBroadcastReceived 'b'\nled_displayImage 'sad'\n}\n\nscript 750 280 {\nwhenBroadcastReceived 'x'\nled_displayImage 'heart'\n}\n\nscript 750 400 {\nwhenBroadcastReceived 'y'\nled_displayImage 'yes'\n}\n\n${modules}`;
  fs.writeFileSync(path.join(output, 'CoCubeRemote.ubp'), robot
    .replace('script 430 40 {', 'script 900 40 {')
    .replace('script 430 230 {', 'script 900 350 {')
    .replaceAll('script 750 ', 'script 1700 '));
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
