// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "forge-std/Script.sol";
import "@erc3643/factory/ITREXFactory.sol";

/// @title DeploySecurityToken — Deploy a tokenized bond via TREXFactory
/// @notice Deploys "Shinhan Corp Bond 2026-A" (SCB26A) on DOS Chain testnet
/// @dev Usage:
///   DEPLOYER_PK=0x$(cat ~/.avalanche-cli/key/9999.pk) \
///   TREX_FACTORY=0xee868094Db045e390c623B3051de33466F068231 \
///   forge script script/DeploySecurityToken.s.sol:DeploySecurityToken \
///     --rpc-url https://test.doschain.com --broadcast -vvv
contract DeploySecurityToken is Script {
    function run() external {
        uint256 deployerPk = vm.envUint("DEPLOYER_PK");
        address deployer = vm.addr(deployerPk);
        address trexFactory = vm.envAddress("TREX_FACTORY");

        console.log("Deployer:", deployer);
        console.log("TREXFactory:", trexFactory);

        // --- Token Details ---
        address[] memory irAgents = new address[](1);
        irAgents[0] = deployer;

        address[] memory tokenAgents = new address[](1);
        tokenAgents[0] = deployer;

        address[] memory complianceModules = new address[](0);
        bytes[] memory complianceSettings = new bytes[](0);

        ITREXFactory.TokenDetails memory tokenDetails = ITREXFactory.TokenDetails({
            owner: deployer,
            name: "Shinhan Corp Bond 2026-A",
            symbol: "SCB26A",
            decimals: 0,
            irs: address(0),        // deploy new IdentityRegistryStorage
            ONCHAINID: address(0),  // let factory create via IdFactory
            irAgents: irAgents,
            tokenAgents: tokenAgents,
            complianceModules: complianceModules,
            complianceSettings: complianceSettings
        });

        // --- Claim Details ---
        uint256[] memory claimTopics = new uint256[](1);
        claimTopics[0] = 1; // KYC claim topic

        address[] memory issuers = new address[](0);
        uint256[][] memory issuerClaims = new uint256[][](0);

        ITREXFactory.ClaimDetails memory claimDetails = ITREXFactory.ClaimDetails({
            claimTopics: claimTopics,
            issuers: issuers,
            issuerClaims: issuerClaims
        });

        // --- Deploy ---
        string memory salt = "shinhan-bond-2026a";

        vm.startBroadcast(deployerPk);
        ITREXFactory(trexFactory).deployTREXSuite(salt, tokenDetails, claimDetails);
        vm.stopBroadcast();

        // --- Read deployed token address ---
        address token = ITREXFactory(trexFactory).getToken(salt);
        console.log("\n========== Shinhan Corp Bond 2026-A Deployed ==========");
        console.log("  Token (SCB26A):", token);
        console.log("  Salt:", salt);
        console.log("=======================================================");
    }
}
