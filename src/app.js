import mongoose from "mongoose";
import express from "express";
import productRouter from './routers/products';

const app = express();

app.use(express.json());

app.use("/api", productRouter);

mongoose.connect('mongodb://127.0.0.1:27017/luyennodejs').then(console.log(1));

export const viteNodeApp = app;