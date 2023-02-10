const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('Removes https://, and ending /', () =>{
    expect(normalizeURL('https://testsite.com/')).toBe('testsite.com')
});
test('Removes http://', () =>{
    expect(normalizeURL('http://testsite.com')).toBe('testsite.com')
});
test('Keeps /path', () =>{
    expect(normalizeURL('http://testsite.com/path/')).toBe('testsite.com/path')
});
test('Test for invalid site name', () =>{
    expect(normalizeURL('abc123')).toBe('Invalid URL')
});