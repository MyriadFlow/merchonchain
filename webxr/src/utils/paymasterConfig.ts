import { createClient, createPublicClient, http } from 'viem'
import { polygon } from 'viem/chains'
import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless'
import { paymasterActionsEip7677 } from 'permissionless/experimental'

export const client = createPublicClient({
	chain: polygon,
	transport: http(),
})

const paymasterService = process.env.PAYMASTER_SERVICE_URL!

export const paymasterClient = createClient({
	chain: polygon,
	transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06))
