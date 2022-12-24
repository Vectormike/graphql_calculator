import supertest from 'supertest';
import { startServer } from '../index';

let app: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
	app = supertest(startServer());
});

describe('Addition', () => {
	it('should add two numbers and return the sum', async () => {
		const response = await app.post('/graphql').send({
			queryName: '',
			variable: {},
			query: `query {
        addition(numbers: {
          a: 1,
          b: 2
          })
          }
          `,
		});

		expect(response.body.data).toEqual({ addition: 3 });
	});
});

describe('Subtraction', () => {
	it('should subtract two numbers and return the difference', async () => {
		const response = await app.post('/graphql').send({
			queryName: '',
			variable: {},
			query: `
          query {
            subtraction(numbers: {
              a: 5,
              b: 3
            }) 
          }
          `,
		});

		expect(response.body.data).toEqual({ subtraction: 2 });
	});
});

describe('Multiplication', () => {
	it('should multiply two and return the result', async () => {
		const response = await app.post('/graphql').send({
			queryName: '',
			variable: {},
			query: `
          query {
            multiplication(numbers: {
              a: 2,
              b: 2
            }) 
          }
          `,
		});

		expect(response.body.data).toEqual({ multiplication: 4 });
	});
});

describe('Division', () => {
	it('should divide two numbers and return the result', async () => {
		const response = await app.post('/graphql').send({
			queryName: '',
			variable: {},
			query: `
          query {
            division(numbers: {
              a: 4,
              b: 2
            }) 
          }
          `,
		});

		expect(response.body.data).toEqual({ division: 2 });
	});
});

describe('Edge cases', () => {
	it('should return null when there is a division by zero', async () => {
		const response = await app.post('/graphql').send({
			queryName: '',
			variable: {},
			query: `
          query {
            division(numbers: {
              a: 4,
              b: 0
            }) 
          }
          `,
		});

		expect(response.body.data).toEqual(null);
	});
});
