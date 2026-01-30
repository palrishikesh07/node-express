const request = require('supertest');
const express = require('express');
const app = require('./index'); // Adjust the path as necessary
const { beforeAll, afterAll, beforeEach, describe, it, expect } = require('@jest/globals');

describe('Products API', () => {
	let server;
	let products = [];

	beforeAll(() => {
		server = app.listen(4000);
	});
	
	afterAll((done) => {
		server.close(done);
	});

	beforeEach(() => {
		products = [];
	});

	it('should create a product', async () => {
		const product = { name: 'Product 1', price: 100 };
		const res = await request(server)
			.post('/products')
			.send(product);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body.name).toBe(product.name);
		expect(res.body.price).toBe(product.price);
	});

	it('should get all products', async () => {
		const product = { name: 'Product 1', price: 100 };
		products.push(product);

		const res = await request(server).get('/products');

		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe(product.name);
		expect(res.body[0].price).toBe(product.price);
	});

	it('should get a product by ID', async () => {
		const product = { name: 'Product 1', price: 100 };
		products.push(product);

		const res = await request(server).get('/products/1');

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(product.name);
		expect(res.body.price).toBe(product.price);
	});

	it('should return 404 for a non-existent product', async () => {
		const res = await request(server).get('/products/999');

		expect(res.status).toBe(404);
		expect(res.text).toBe('Product not found');
	});

	it('should update a product by ID', async () => {
		const product = { name: 'Product 1', price: 100 };
		products.push(product);

		const updatedProduct = { name: 'Updated Product', price: 150 };
		const res = await request(server)
			.put('/products/1')
			.send(updatedProduct);

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(updatedProduct.name);
		expect(res.body.price).toBe(updatedProduct.price);
	});

	it('should return 404 when updating a non-existent product', async () => {
		const updatedProduct = { name: 'Updated Product', price: 150 };
		const res = await request(server)
			.put('/products/999')
			.send(updatedProduct);

		expect(res.status).toBe(404);
		expect(res.text).toBe('Product not found');
	});

	it('should delete a product by ID', async () => {
		const product = { name: 'Product 1', price: 100 };
		products.push(product);

		const res = await request(server).delete('/products/1');

		expect(res.status).toBe(204);
	});

	it('should return 404 when deleting a non-existent product', async () => {
		const res = await request(server).delete('/products/999');

		expect(res.status).toBe(404);
		expect(res.text).toBe('Product not found');
	});
});