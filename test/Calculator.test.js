const { expect } = require('chai')
const { ethers } = require('hardhat')

// Run the following to run the test
// npx hardhat test test/Calculator.test.js --no-compile

describe('Calculator Contract Tests', () => {
	// Function to the contract, deployer and another address. Similar to BeforeEach()
	async function deployContract() {
		// Get the ABI and Bytecode
		const abi = require('../build/Calculator.abi.json')
		const bytecode = require('../build/Calculator.bytecode.json')

		// Get the Owner and another address
		const [deployer, user] = await ethers.getSigners()

		// Deploy the Contract
		const Calculator = await ethers.getContractFactory(abi, bytecode)
		const calculator = await (await Calculator.deploy()).deployed()

		// Log out the deployed address
		// console.log(calculator.address);
		return { calculator, deployer, user }
	}

	// Should deploy the contract proeprly
	it('Deploys the contract properly', async () => {
		const { calculator } = await deployContract()
		await expect(calculator.address).is.properAddress
		await expect(calculator).is.not.null
	})

	it('Should add the numbers', async () => {
		const { calculator } = await deployContract()
		expect(await calculator.add(5, 5)).to.not.be.null
		expect(await calculator.add(20, 20)).to.be.equal(40)
		expect(await calculator.add(100, 5000)).to.be.equal(5100)
	})

	it('Should subtract the numbers', async () => {
		const { calculator } = await deployContract()
		expect(await calculator.subtract(5, 5)).to.not.be.null
		expect(await calculator.subtract(20, 20)).to.be.equal(0)
		expect(await calculator.subtract(100, 5000)).to.be.equal(4900)
		expect(await calculator.subtract(3300, 300)).to.be.equal(3000)
	})

	it('Should mutiply the numbers', async () => {
		const { calculator } = await deployContract()
		expect(await calculator.multiply(5, 5)).to.not.be.null
		expect(await calculator.multiply(20, 20)).to.be.equal(400)
		expect(await calculator.multiply(100, 5000)).to.be.equal(500000)
	})

	it('Should divide the numbers', async () => {
		const { calculator } = await deployContract()
		expect(await calculator.divide(5, 5)).to.not.be.null
		expect(await calculator.divide(20, 2)).to.be.equal(10)
		expect(await calculator.divide(100, 5000)).to.be.equal(50)
	})
})
