// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PayrollManager.sol";
import "../src/EmployeeRegistry.sol";

contract DeployDirect is Script {
    address internal constant DEFAULT_USDT =
        0x75edC9335175Fc0552D51D48439F229c10420fe3;

    function run() external {
        // Optional override via env (defaults to BOT Chain Testnet tUSDT)
        address usdt = vm.envOr("USDT_ADDRESS", DEFAULT_USDT);
        // Get private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts...");
        console.log("USDT address:", usdt);
        console.log("Deployer address:", deployer);

        // Start broadcast using the private key
        vm.startBroadcast(deployerPrivateKey);

        EmployeeRegistry employeeRegistry = new EmployeeRegistry(deployer);
        console.log("EmployeeRegistry deployed at:", address(employeeRegistry));

        PayrollManager payrollManager = new PayrollManager(
            usdt,
            address(employeeRegistry),
            deployer
        );
        console.log("PayrollManager deployed at:", address(payrollManager));

        vm.stopBroadcast();

        console.log("=== Deployment Summary ===");
        console.log("EmployeeRegistry:", address(employeeRegistry));
        console.log("PayrollManager:", address(payrollManager));
        console.log("Admin:", deployer);
        console.log("USDT Token:", usdt);
    }
}