import { Address, Hex, concat } from "viem";

export type RevokePermissionsRequestParams = {
    permissionsContext: "0x{string}";
};

export type RevokePermissionsResponseResult = {};

export type GrantPermissionsResponse = {
  expiry: number
  factory?: `0x${string}` | undefined
  factoryData?: string | undefined
  grantedPermissions: readonly {
    data: unknown
    policies: readonly {
      data: unknown
      type: string
    }[]
    required?: boolean | undefined
    type: string
  }[]
  permissionsContext: string
  signerData?:
    | {
        userOpBuilder?: `0x${string}` | undefined
        submitToAddress?: `0x${string}` | undefined
      }
    | undefined
};

export type GrantPermissionsRequestParams = {
    account?: `0x${string}`;
  
    chainId: number;
  
    signer: {
      type: string;
      data: any;
    };
  
    permissions: Permission[];
  
    expiry: number;
};

export interface Permission {
    type: PermissionType;
    policies: Policy[];
    required: boolean;
    data: any;
}

export interface Policy {
    type: PolicyType;
    data: any;
}

export type PermissionType = "native-token-transfer" | "erc20-token-transfer" | "erc721-token-transfer" | "erc1155-token-transfer";
export type PolicyType = "gas-limit" | "call-limit" | "rate-limit" | "spent-limit";

export type GetContextParams = {
  nonceKey: Hex,
  executionMode: any,
  signerAddress: Address,
  enableData: Hex
}

export type GetContextReturnType = {
  permissionData: Hex,
  permissionEnableData: Hex,
  permissionEnableDataSignature: Hex
}

export type PolicyData = {
  policy: string;
  initData: string;
}

export type  ActionData = {
  actionId: string;
  actionPolicies: PolicyData[];
}

export type  EnableSessions = {
  isigner: string;
  isignerInitData: string;
  userOpPolicies: PolicyData[];
  erc1271Policies: PolicyData[];
  actions: ActionData[];
  permissionEnableSig: string;
}

// define mode and exec type enums
export const CALLTYPE_SINGLE = "0x00" // 1 byte
export const CALLTYPE_BATCH = "0x01" // 1 byte
export const EXECTYPE_DEFAULT = "0x00" // 1 byte
export const EXECTYPE_TRY = "0x01" // 1 byte
export const EXECTYPE_DELEGATE = "0xFF" // 1 byte
export const MODE_DEFAULT = "0x00000000" // 4 bytes
export const UNUSED = "0x00000000" // 4 bytes
export const MODE_PAYLOAD = "0x00000000000000000000000000000000000000000000" // 22 bytes
export const ERC1271_MAGICVALUE = "0x1626ba7e"
export const ERC1271_INVALID = "0xffffffff"

export const EXECUTE_SINGLE = concat([
  CALLTYPE_SINGLE,
  EXECTYPE_DEFAULT,
  MODE_DEFAULT,
  UNUSED,
  MODE_PAYLOAD
])