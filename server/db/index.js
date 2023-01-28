const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "mydatabase",
  connectionLimit: 10,
  port: 3306,
});
let rootdb = {};

rootdb.login = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (err, results) => {
        if (err) {
          console.log(err);

          return reject(err);
        } else if (!results.length) {
          console.log("else if  ", results);
          return resolve({ status: 0, data: [] });
        } else {
          console.log("hey ", results);
          let token = jwt.sign({ data: results }, "secret");
          const user = { status: 1, data: results, token: token };
          return resolve(user);
        }
      }
    );
  });
};
rootdb.registeration = (input) => {
  var sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT username FROM users WHERE username = ?`,
      [input.username],
      (err, results) => {
        if (err) {
          return reject({ status: 0, data: err });
        } else if (!results.length) {
          console.log("else if  ", results);
          pool.query(
            sql,
            [input.username, input.email, input.password],
            (err, result) => {
              if (err) {
                return reject({ status: 0, data: err });
              }
              let token = jwt.sign({ data: result }, "secret");
              return resolve({ status: 1, data: result, token: token });
            }
          );
        } else {
          console.log("else if  ", results);
          return resolve({ status: 0, data: "username already exist" });
        }
      }
    );
  });
};
// employee list
rootdb.emplopyeelist = () => {
  return new Promise((resolve, reject) => {
    sql = `select e1.empid, j.job_title, e1.ename  ,  e2.ename as MgrName,e1.hiredate, e1.salary ,e1.comission,d.dname
    from employeetable e1 left join employeetable e2 on e1.mgrid = e2.empid
    inner join departments d on e1.deptid = d.deptid
    inner join jobs_table j on e1.jobid=j.job_id`;
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });
};
// employee delete
rootdb.employeedelete = (id) => {
  return new Promise((resolve, reject) => {
    var sql = `delete from employeetable
    where empid=?`;
    pool.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
rootdb.employeeupdate = (input) => {
  var sql = `update employeetable
set ename =?, 
jobid=?,
mgrid =?,
hiredate=?,
salary =?,
comission =?,
deptid=?
where empid= ?`;
  console.log(input);
  // inputField =;
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.ename,
        input.jobid,
        input.mgrid,
        input.hiredate,
        input.salary,
        input.comission,
        input.deptid,
        input.empid,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};
rootdb.employeebyid = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from employeetable where empid=?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.employeesmrg = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from employeetable where jobid ="mgr" or jobid="pres"`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.employeejobs = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from jobs_table`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
rootdb.employeeinsert = (input) => {
  var sql = `INSERT INTO  employeetable
  (
     empid,ename,jobid,mgrid,hiredate,salary,comission,deptid
  )
  VALUES
  (
      ?, ?, ?, ?, ?, ?,?,?
  )`;
  var inputField = [
    input.empid,
    input.ename,
    input.jobid,
    input.mgrid,
    input.hiredate,
    input.salary,
    input.comission,
    input.deptid,
  ];
  return new Promise((resolve, reject) => {
    pool.query(sql, inputField, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
rootdb.departmentlist = () => {
  sql = `select departments.deptid,departments.dname,employeetable.ename,concat(locationid," , " ,state, " , ",city) as location from employeetable 
  inner join departments on departments.mgrid=employeetable.empid inner join location_table on departments.location_id=location_table.locationid;`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
rootdb.departmentdelete = (index) => {
  sql = `delete from departments
  where deptid=?`;
  return new Promise((resolve, reject) => {
    pool.query(sql, [index], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
rootdb.insertDepartment = (inputdepartment) => {
  var sql = `insert into  Departments
  (
    deptid,dname,mgrid,location_id
  )
  values(
    ?,?,?,?
  )`;
  console.log(inputdepartment);
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        inputdepartment.deptid,
        inputdepartment.dname,
        inputdepartment.mgrid,
        inputdepartment.location_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};
rootdb.departmentById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Departments where deptid=?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.departmentupdate = (input) => {
  var sql = `update departments
  set deptid =?, 
  dname=?,
  mgrid =?,
  location_id=?
  where deptid= ?`;
  console.log(input);
  inputField = [
    input.deptid,
    input.dname,
    input.mgrid,
    input.location_id,
    input.deptid,
  ];
  return new Promise((resolve, reject) => {
    pool.query(sql, inputField, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
    console.log(sql);
  });
};
rootdb.location = () => {
  var sql = `select locationid, concat(locationid," , " ,state, " , ",city) as location from location_table`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
module.exports = rootdb;
