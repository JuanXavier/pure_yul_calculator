const hre = require('hardhat')

async function main() {
	const abi = require('../build/Calculator.abi.json')
	const bytecode = require('../build/Calculator.bytecode.json')
	const Calculator = await hre.ethers.getContractFactory(abi, bytecode)
	const calculator = await (await Calculator.deploy()).deployed()
	console.log('Calculator Contract Deployed to : ', calculator.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
