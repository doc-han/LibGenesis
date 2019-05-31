module.exports = {
  url: `http://gen.lib.rus.ec/search.php?req=`,
  regex: /bgcolor.+<td>(\d+)<\/td>/gm,
  dataUrl: `http://libgen.io/json.php?fields=Title,Author,MD5&ids=`
}
