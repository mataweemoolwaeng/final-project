const {
  Items,
  Facultys,
  Departments,
  Buildings,
  Locations,
  Categorys,
  TypeItems,
  Profiles,
  UpDateStatuses,
  ImgItems,
} = require("../../model/index.model");

const { Op } = require("sequelize");

const itemInclude = [
  {
    model: Facultys,
  },
  {
    model: Departments,
  },
  {
    model: Buildings,
  },
  {
    model: Locations,
  },
  {
    model: Categorys,
  },
  {
    model: TypeItems,
  },
  {
    model: Profiles,
  },
  {
    model: UpDateStatuses,
  },
  {
    model: ImgItems,
    attributes: ["imgItem_Id", "name_image_item", "itemItemId"],
  },
];

// GET All
const getItemById = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findOne({
      where: { item_id: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });
    if (Item) {
      // console.log("1231Item ", Item);
      return res.send(Item);
    } else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByCategoryID = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { categoryCateId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });
    return res.send(Item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getItemByTypeID = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { typeItemTypeId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });
    return res.send(Item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByFty_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { facultyFId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByDpm_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { departmentDId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByBud_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { buildingBId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getItemByLocat_Id = async (req, res) => {
  const { id } = req.params;
  // console.log("id = " + id);
  try {
    const Item = await Items.findAll({
      where: { locationLId: id },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByIds = async (req, res) => {
  const { ids } = req.body;

  try {
    const Item = await Items.findAll({
      where: { item_id: ids },
      include: itemInclude,
      order: [["item_id", "ASC"]],
    });

    if (Item) return res.send(Item);
    else {
      return res.status(404).send({
        status: "404",
        error: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const autoRecommendCode = async (req, res) => {
  const { code } = req.body;
  try {
    const items = await Items.findAll({
      where: {
        code: {
          [Op.like]: `${code}%`,
        },
      },
      attributes: ["code"],
    });

    console.log("items = " + items);

    const suggestions = items.map((item) => {
      const parts = item.code.split("-");
      return parts.slice(0, 2).join("-");
    });

    const uniqueSuggestions = [...new Set(suggestions)];

    return res.status(200).json(uniqueSuggestions);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getItemById: getItemById,
  getItemByCategoryID: getItemByCategoryID,
  getItemByTypeID: getItemByTypeID,
  getItemByFty_Id: getItemByFty_Id,
  getItemByDpm_Id: getItemByDpm_Id,
  getItemByBud_Id: getItemByBud_Id,
  getItemByLocat_Id: getItemByLocat_Id,
  getItemByIds: getItemByIds,
  autoRecommendCode: autoRecommendCode,
};
