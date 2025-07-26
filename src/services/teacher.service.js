const Teacher=require('../models/Teacher')
const { Op } = require("sequelize");





let addData = async (obj) => {

  return await Teacher.create(obj);

};



let addBulkData = async ( obj) => {

  return await Teacher.bulkCreate(obj);

};



let updateData = async (id, obj) => {

  return await Teacher.update(obj, {  where: { id: id }});

};



let destroyData = async ( cond) => {

  return await Teacher.destroy({ where: cond });

};



let getAllData = async (tableName) => {

  return await Teacher.findAll();

};



let getAllDataByCond = async ( cond) => {

  if (cond.fieldName) {

    if (cond.fieldName.toLowerCase().includes("date")) {

      cond[cond.fieldName] = { [Op.gte]: new Date(cond.fieldValue) };

      delete cond.fieldName;

      delete cond.fieldValue;

    }

    return await Teacher.findAll({ where: cond });

  } else return await Teacher.findAll({ where: cond });

};



let findAndCountAllDataByCond = async (tableName, cond, other) => {

  return await Teacher.findAndCountAll({ where: cond, ...other });

};



let getAllDataByCondAndPagination = async (

  tableName,

  cond,

  page,

  pageSize,

  order

) => {

  const offset = page * pageSize;

  const limit = pageSize;

  let filter = cond.filter;

  let fields = cond.fields;

  delete cond.filter;

  if (filter !== "") {

    let fieldToSearch = [];

    return async

      .each(fields, (field, after_field) => {

        fieldToSearch.push({ [field]: { [Op.like]: `%${filter}%` } });

        after_field();

      })

      .then(async () => {

        cond = {

          ...cond,

          [Op.or]: fieldToSearch,

        };

        return await Teacher.findAndCountAll({

          limit,

          offset,

          where: cond,

          order,

          // order: [['createdAt', order]],

        });

      });

  } else {

    return await Teacher.findAndCountAll({

      limit,

      offset,

      where: cond,

      order: order,

    });

  }

};



let getOneDataByCond = async (tableName, cond) => {

  return await Teacher.findOne({

    where: cond,

  });

};



let getAllDataByAttr = async (tableName, attr) => {

  return await Teacher.findAll({

    attributes: attr,

  });

};



let getAllDataByCondAndAttr = async (tableName, cond, attr) => {

  return await Teacher.findAll({

    where: cond,

    attributes: attr,

  });

};



let getOneDataByCondAndAttr = async (tableName, cond, attr) => {

  return await Teacher.findOne({

    where: cond,

    attributes: attr,

  });

};



let getAllDataByCondWithHasAll = async (tableName, cond, secondTable) => {

  return await Teacher.findAll({

    where: cond,

    include: model[secondTable],

  });

};



let getOneDataByCondWithHasAll = async (tableName, cond, secondTable) => {

  return await Teacher.findOne({

    where: cond,

    include: model[secondTable],

  });

};



let getAllDataByCondWithBelongsTo = async (tableName, cond, secondTable) => {

  return await Teacher.findAll({

    where: cond,

    include: model[secondTable],

  });

};



let getOneDataByCondWithBelongsTo = async (tableName, cond, secondTable) => {

  return await Teacher.findOne({

    where: cond,

    include: model[secondTable],

  });

};



module.exports = {

  addData,

  addBulkData,

  updateData,

  destroyData,

  getAllData,

  getAllDataByCond,

  getOneDataByCond,

  getAllDataByAttr,

  getAllDataByCondAndAttr,

  getOneDataByCondAndAttr,

  getAllDataByCondAndPagination,

  findAndCountAllDataByCond,

  getAllDataByCondWithHasAll,

  getOneDataByCondWithHasAll,

  getAllDataByCondWithBelongsTo,

  getOneDataByCondWithBelongsTo,

};

