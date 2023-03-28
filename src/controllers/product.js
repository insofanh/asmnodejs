import product from "../models/product";
import Product from "../models/product";
import joi from "joi";

const Brand = joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
    slug: joi.string().required()
})

const Specification = joi.object({
    name: joi.string().required(),
    attributes: joi.array().items(joi.object({
        code: joi.string().required(),
        name: joi.string().required(),
        value: joi.string().required(),
    })).min(1).required()
})

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number(),
    descript: joi.string(),
    brand: joi.array().items(Brand).min(1).required(),
    specifications: joi.array().items(Specification).min(1).required()
});



export const create = async(req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            })
        }
        const product = await Product.create(req.body);
        return res.status(201).json({
            message: "Tao san pham thanh cong",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })

    }
}

export const getAll = async(req, res) => {
    try {

        const products = await Product.find();
        return res.status(201).json(products)
    } catch (error) {
        return res.status(400).json({
            message: error,
        })

    }
}

export const get = async(req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error,
        })

    }
}

export const remove = async(req, res) => {
    try {
        // await axios.delete(`http://localhost:3002/products/${req.params.id}`);
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async(req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

//search
// app.get('/products/search', (req, res) => {
//     const { field, keyword } = req.query;

//     // Tạo query object để truy vấn cơ sở dữ liệu theo trường và từ khóa tìm kiếm
//     const query = {};
//     query[field] = { $regex: keyword, $options: 'i' };

//     Product.find(query, (err, products) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(products);
//         }
//     });
// });