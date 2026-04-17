// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "forge-std/Script.sol";
import "@onchain-id/solidity/contracts/interface/IIdentity.sol";
import "@erc3643/registry/interface/IIdentityRegistry.sol";
import "@erc3643/token/IToken.sol";

contract QuickSetupMainnet is Script {
    function run() external {
        uint256 pk = vm.envUint("DEPLOYER_PK");
        address deployer = vm.addr(pk);

        address deployerId = 0x3a55529D46EF3C82D48A3D4f6685892662B2AD10;
        address claimIssuer = 0x726B089560bd88059c804c3F0895A6023CDE3C73;
        address token = 0x27202027046E614E159329d9cdf8c35a197CC7b5;
        address investor = 0x1234567890AbcdEF1234567890aBcdef12345678;
        address ir = 0xA02d42F345B4a96a756292b1b8818137898A90c1;

        // Sign KYC claim for deployer
        bytes memory claimData = abi.encode(deployer, "KYC_VERIFIED", block.timestamp);
        bytes32 dataHash = keccak256(abi.encode(deployerId, uint256(1), claimData));
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash)
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(pk, prefixedHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.startBroadcast(pk);

        // 1. Add KYC claim to deployer identity
        IIdentity(deployerId).addClaim(1, 1, claimIssuer, signature, claimData, "");
        console.log("[1] KYC claim added to deployer");

        // 2. Verify deployer
        bool verified = IIdentityRegistry(ir).isVerified(deployer);
        console.log("[2] Deployer isVerified:", verified);

        // 3. Unpause token
        IToken(token).unpause();
        console.log("[3] Token unpaused");

        // 4. Mint 100 tokens to deployer
        IToken(token).mint(deployer, 100);
        console.log("[4] Minted 100 SCB26A to deployer");

        // 5. Transfer 10 to investor
        IToken(token).transfer(investor, 10);
        console.log("[5] Transferred 10 SCB26A to investor");

        // 6. Check balances
        console.log("[6] Deployer balance:", IToken(token).balanceOf(deployer));
        console.log("    Investor balance:", IToken(token).balanceOf(investor));

        vm.stopBroadcast();
    }
}
