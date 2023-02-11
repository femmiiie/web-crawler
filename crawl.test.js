const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

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

test('Gets 2 absolute URLs from <a> tags', () =>{
    expect(getURLsFromHTML('<a href="/contentpage"></a><a href="/aboutpage"></a>', 'https://testsite.com')).toStrictEqual(['https://testsite.com/contentpage', 'https://testsite.com/aboutpage'])
});

test('Gets absolute URL from <a> tag', () =>{
    expect(getURLsFromHTML('<a href="/contentpage"></a>', 'https://testsite.com')).toStrictEqual(['https://testsite.com/contentpage'])
});

test('Returns same url', () =>{
    expect(getURLsFromHTML('<a href="https://testsite.com/contentpage"></a>', 'https://testsite.com')).toStrictEqual(['https://testsite.com/contentpage'])
});

test('Return invalid HTML', () =>{
    expect(getURLsFromHTML('abc123', 'https://testsite.com')).toBe('Invalid HTML Body')
});