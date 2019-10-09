const creators = require('../../lib/creator');

describe('Node Version', function () {
  test('should be retrieved', function () {
    const nodeFormat = /^([1-9][0-9])\.([1-9]?[0-9])\.([0-9])$/;
    expect(creators.getNodeVersion()).toEqual(expect.stringMatching(nodeFormat));
  });
});

describe('File Exist Checker', function () {
  test('should throw error when a file does not exist', function () {
    const fileWhichDoesNotExist = 'sample.txt';
    expect(() => {
      creators.checkFileExist(fileWhichDoesNotExist);
    }).toThrow('sample.txt does not exist');
  });
});

describe('Config Reader', function () {
  test('should read the configuration from packag.json', function () {
    
  });
});
