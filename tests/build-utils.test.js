const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
    buildRelativeRootPath,
    getSharedActivityAssetPlan,
    rewriteAssetLinks
} = require('../build-utils');

function createFile(filePath, contents) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents);
}

function testRewriteAssetLinks() {
    const markdown = `
![](traffic.mp4)
<source src="traffic.mp4" type="video/mp4">
<a href="program.xml" download="program.xml">download</a>
`;

    const rewritten = rewriteAssetLinks(markdown, {
        'traffic.mp4': '../../../activity-assets/example/localized/traffic.mp4',
        'program.xml': '../../../activity-assets/example/common/program.xml'
    });

    assert(rewritten.includes('![](../../../activity-assets/example/localized/traffic.mp4)'));
    assert(rewritten.includes('<source src="../../../activity-assets/example/localized/traffic.mp4" type="video/mp4">'));
    assert(rewritten.includes('<a href="../../../activity-assets/example/common/program.xml" download="program.xml">download</a>'));
}

function testGetSharedActivityAssetPlan() {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cocube-build-utils-'));
    const activityPath = path.join(tempRoot, 'activity');

    createFile(path.join(activityPath, 'files', 'program.xml'), 'same-common');
    createFile(path.join(activityPath, 'locales', 'cn', 'files', 'traffic.mp4'), 'shared-video');
    createFile(path.join(activityPath, 'locales', 'en', 'files', 'traffic.mp4'), 'shared-video');
    createFile(path.join(activityPath, 'locales', 'es', 'files', 'traffic.mp4'), 'shared-video');
    createFile(path.join(activityPath, 'locales', 'cn', 'files', 'notes.txt'), 'cn-only');
    createFile(path.join(activityPath, 'locales', 'en', 'files', 'pair.gif'), 'pair-shared');
    createFile(path.join(activityPath, 'locales', 'es', 'files', 'pair.gif'), 'pair-shared');
    createFile(path.join(activityPath, 'locales', 'cn', 'files', 'pair.gif'), 'different');
    createFile(path.join(activityPath, 'locales', 'cn', 'files', 'script.png'), 'same-script');
    createFile(path.join(activityPath, 'locales', 'en', 'files', 'script.png'), 'same-script');

    const plan = getSharedActivityAssetPlan(activityPath, 'example');

    assert.strictEqual(plan.common['program.xml'].outputPath, 'activity-assets/example/common/program.xml');
    assert.strictEqual(plan.localizedShared.cn['traffic.mp4'].outputPath, 'activity-assets/example/localized/traffic.mp4');
    assert.strictEqual(plan.localizedShared.en['traffic.mp4'].outputPath, 'activity-assets/example/localized/traffic.mp4');
    assert.strictEqual(plan.localizedShared.es['traffic.mp4'].outputPath, 'activity-assets/example/localized/traffic.mp4');
    assert.strictEqual(plan.localizedShared.en['pair.gif'].outputPath, 'activity-assets/example/localized/pair.gif');
    assert.strictEqual(plan.localizedShared.es['pair.gif'].outputPath, 'activity-assets/example/localized/pair.gif');
    assert.strictEqual(plan.localizedShared.cn['pair.gif'], undefined);
    assert.strictEqual(plan.localizedShared.cn['script.png'], undefined);
    assert.strictEqual(plan.localizedShared.en['script.png'], undefined);
    assert.strictEqual(plan.localizedUnique.cn['script.png'].endsWith('script.png'), true);
    assert.strictEqual(plan.localizedUnique.en['script.png'].endsWith('script.png'), true);
}

function testBuildRelativeRootPath() {
    assert.strictEqual(buildRelativeRootPath('activities/example'), '../../../');
    assert.strictEqual(buildRelativeRootPath('activities/example/guide'), '../../../../');
}

testRewriteAssetLinks();
testGetSharedActivityAssetPlan();
testBuildRelativeRootPath();
