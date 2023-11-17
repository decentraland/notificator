import { AppComponents, PushWrapper } from '../types'
import { PushAPI } from '@pushprotocol/restapi'
import { Wallet } from 'ethers'

export async function createPushNotificationsComponent(
  components: Pick<AppComponents, 'config' | 'logs' | 'fetch'>
): Promise<PushWrapper> {
  const { config } = components
  const pushDelegatePk = await config.requireString('PUSH_DELEGATE_PK')
  const pushEnv = await config.requireString('PUSH_ENV')
  const pushChannel = await config.requireString('PUSH_CHANNEL')

  const signer: Wallet = new Wallet(pushDelegatePk)
  console.log('address', signer.address)
  const delegateUser = await PushAPI.initialize(signer as any, { env: pushEnv as any })

  async function sendNotificationToChannel(data: any, to: string[]): Promise<void> {
    const sendNotifRes = await delegateUser.channel.send(to, {
      channel: pushChannel,
      notification: { title: 'test', body: 'test' }
    })
    console.log('sendNotifRes', sendNotifRes)
    return
  }

  return {
    sendNotificationToChannel
  }
}
