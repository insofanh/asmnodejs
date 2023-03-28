import Product from "./models/product"
app.get('/products/search', (req, res) => {
    const { field, keyword } = req.query;

    // Tạo query object để truy vấn cơ sở dữ liệu theo trường và từ khóa tìm kiếm
    const query = {};
    query[field] = { $regex: keyword, $options: 'i' };

    Product.find(query, (err, products) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(products);
        }
    });
});