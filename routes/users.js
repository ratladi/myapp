var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');
const config = {
  user          : "",
  password      : "",
  connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = )(PORT = ))(CONNECT_DATA = (SERVER = DEDICATED) (SID= )))"
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let conn;
  try {
    conn = await oracledb.getConnection(config)

    const result = await conn.execute(
      'select * from BWA'
    )

    console.log(result.rows[0])
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
});

module.exports = router;
