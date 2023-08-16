module.exports = {
  url: `http://libgen.is/search.php?req=`,
  regex: /bgcolor.+<td>(\d+)<\/td>/gm,
  dataUrl: `http://libgen.is/json.php?fields=id,Title,Author,MD5,coverurl,language,filesize,extension,year,publisher&ids=`,
  dlUrl: `http://62.182.86.140/main`, // id(rounded)/md5(lower)/Author - Title-Publisher (Year).extension
  coversUrl: `http://62.182.86.140/covers/`
}
