const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            return res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, stock } = req.body;
        const product = new Product({
            name: name || 'Sample name',
            price: price || 0,
            user: req.user._id,
            images: [image || '/images/sample.jpg'], // Simplified for now
            brand: brand || 'Sample brand',
            category: category || 'Sample category',
            stock: stock || 0,
            numReviews: 0,
            description: description || 'Sample description',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        stock,
    } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.images = image ? [image] : product.images;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);

            product.ratings.count = product.reviews.length;
            product.ratings.average =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany({});

        const User = require('../models/User');
        const adminUser = await User.findOne({ role: 'admin' });
        const sampleUser = adminUser ? adminUser._id : (await User.findOne())._id;

        if (!sampleUser) {
            return res.status(400).json({ message: 'No users found. Please register a user first.' });
        }

        const products = [
            {
                user: sampleUser,
                name: 'Festive Banarasi Silk Saree',
                description: 'Handcrafted silk saree with intricate gold zari work.',
                price: 5999,
                discountPrice: 8999,
                category: 'Fashion',
                brand: 'Ethnica',
                images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
                stock: 45,
                isFestive: true
            },
            {
                user: sampleUser,
                name: 'Smart Bass Headphones',
                description: 'Wireless noise cancelling headphones for audiophiles.',
                price: 12999,
                discountPrice: 15999,
                category: 'Electronics',
                brand: 'SoundHub',
                images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
                stock: 25
            },
            {
                user: sampleUser,
                name: 'Designer Diya Set (Pack of 12)',
                description: 'Hand-painted terracotta diyas for festive light.',
                price: 499,
                discountPrice: 799,
                category: 'Home Decor',
                brand: 'Utsav',
                images: ['https://images.unsplash.com/photo-1543831861-1e2474f9d02f?auto=format&fit=crop&w=800&q=80'],
                stock: 150,
                isFestive: true
            },
            {
                user: sampleUser,
                name: 'Organic Masala Chai Blend',
                description: 'Premium Indian spices mixed with Assam tea.',
                price: 349,
                discountPrice: 450,
                category: 'Groceries',
                brand: 'FarmDirect',
                images: ['https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80'],
                stock: 200
            },
            {
                user: sampleUser,
                name: 'Festive Kurta for Men',
                description: 'Cotton silk blend kurta with elegant embroidery.',
                price: 2499,
                discountPrice: 3999,
                category: 'Fashion',
                brand: 'Manyavar Style',
                images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'],
                stock: 60,
                isFestive: true
            },
            {
                user: sampleUser,
                name: '4K Ultra HD Smart TV',
                description: 'Immersive cinematic experience with HDR10+.',
                price: 34999,
                discountPrice: 45999,
                category: 'Electronics',
                brand: 'TechVision',
                images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
                stock: 15
            },
            {
                user: sampleUser,
                name: 'Handcrafted Wall Hanging',
                description: 'Traditional Indian wall art made by rural artisans.',
                price: 899,
                discountPrice: 1299,
                category: 'Home Decor',
                brand: 'RuralRoots',
                images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'],
                stock: 40,
                isFestive: true
            },
            {
                user: sampleUser,
                name: 'Premium Almonds (500g)',
                description: 'California almonds, rich in protein and nutrients.',
                price: 750,
                discountPrice: 950,
                category: 'Groceries',
                brand: 'NutriDaily',
                images: ['https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80'],
                stock: 100
            }
        ];

        const createdProducts = await Product.insertMany(products);
        res.json(createdProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    seedProducts
};
