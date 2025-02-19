import { NotificationMessage } from "../events-helpers.js"

import { ChannelAdBreakBeginEvent, ChannelAdBreakBeginSubscription, makeChannelAdBreakBeginSubscription } from "./channel.ad_break.begin.js"
import { ChannelBanEvent, ChannelBanSubscription, makeChannelBanSubscription } from "./channel.ban.js"
import { ChannelPointsCustomRewardAddEvent, ChannelPointsCustomRewardAddSubscription, makeChannelPointsCustomRewardAddSubscription } from "./channel.channel_points_custom_reward.add.js"
import { ChannelPointsCustomRewardRemoveEvent, ChannelPointsCustomRewardRemoveSubscription, makeChannelPointsCustomRewardRemoveSubscription } from "./channel.channel_points_custom_reward.remove.js"
import { ChannelPointsCustomRewardUpdateEvent, ChannelPointsCustomRewardUpdateSubscription, makeChannelPointsCustomRewardUpdateSubscription } from "./channel.channel_points_custom_reward.update.js"
import { ChannelPointsCustomRewardRedemptionAddEvent, ChannelPointsCustomRewardRedemptionAddSubscription, makeChannelPointsCustomRewardRedemptionAddSubscription } from "./channel.channel_points_custom_reward_redemption.add.js"
import { ChannelPointsCustomRewardRedemptionUpdateEvent, ChannelPointsCustomRewardRedemptionUpdateSubscription, makeChannelPointsCustomRewardRedemptionUpdateSubscription } from "./channel.channel_points_custom_reward_redemption.update.js"
import { CharityDonationEvent, CharityDonationSubscription, makeCharityDonationSubscription } from "./channel.charity_campaign.donate.js"
import { CharityCampaignProgressEvent, CharityCampaignProgressSubscription, makeCharityCampaignProgressSubscription } from "./channel.charity_campaign.progress.js"
import { CharityCampaignStartEvent, CharityCampaignStartSubscription, makeCharityCampaignStartSubscription } from "./channel.charity_campaign.start.js"
import { CharityCampaignStopEvent, CharityCampaignStopSubscription, makeCharityCampaignStopSubscription } from "./channel.charity_campaign.stop.js"
import { ChannelChatClearEvent, ChannelChatClearSubscription, makeChannelChatClearSubscription } from "./channel.chat.clear.js"
import { ChannelChatClearUserMessagesEvent, ChannelChatClearUserMessagesSubscription, makeChannelChatClearUserMessagesSubscription } from "./channel.chat.clear_user_messages.js"
import { ChannelChatMessageDeleteEvent, ChannelChatMessageDeleteSubscription, makeChannelChatMessageDeleteSubscription } from "./channel.chat.message_delete.js"
import { ChannelChatNotificationEvent, ChannelChatNotificationSubscription, makeChannelChatNotificationSubscription } from "./channel.chat.notification.js"
import { ChannelCheerEvent, ChannelCheerSubscription, makeChannelCheerSubscription } from "./channel.cheer.js"
import { ChannelFollowEvent, ChannelFollowSubscription, makeChannelFollowSubscription } from "./channel.follow.js"
import { GoalBeginEvent, GoalBeginSubscription, makeGoalBeginSubscription } from "./channel.goal.begin.js"
import { GoalEndEvent, GoalEndSubscription, makeGoalEndSubscription } from "./channel.goal.end.js"
import { GoalProgressEvent, GoalProgressSubscription, makeGoalProgressSubscription } from "./channel.goal.progress.js"
import { ChannelGuestStarGuestUpdateEvent, ChannelGuestStarGuestUpdateSubscription, makeChannelGuestStarGuestUpdateSubscription } from "./channel.guest_star_guest.update.js"
import { ChannelGuestStarSessionBeginEvent, ChannelGuestStarSessionBeginSubscription, makeChannelGuestStarSessionBeginSubscription } from "./channel.guest_star_session.begin.js"
import { ChannelGuestStarSessionEndEvent, ChannelGuestStarSessionEndSubscription, makeChannelGuestStarSessionEndSubscription } from "./channel.guest_star_session.end.js"
import { ChannelGuestStarSettingsUpdateEvent, ChannelGuestStarSettingsUpdateSubscription, makeChannelGuestStarSettingsUpdateSubscription } from "./channel.guest_star_settings.update.js"
import { HypeTrainBeginEvent, HypeTrainBeginSubscription, makeHypeTrainBeginSubscription } from "./channel.hype_train.begin.js"
import { HypeTrainEndEvent, HypeTrainEndSubscription, makeHypeTrainEndSubscription } from "./channel.hype_train.end.js"
import { HypeTrainProgressEvent, HypeTrainProgressSubscription, makeHypeTrainProgressSubscription } from "./channel.hype_train.progress.js"
import { ChannelModeratorAddEvent, ChannelModeratorAddSubscription, makeChannelModeratorAddSubscription } from "./channel.moderator.add.js"
import { ChannelModeratorRemoveEvent, ChannelModeratorRemoveSubscription, makeChannelModeratorRemoveSubscription } from "./channel.moderator.remove.js"
import { ChannelPollBeginEvent, ChannelPollBeginSubscription, makeChannelPollBeginSubscription } from "./channel.poll.begin.js"
import { ChannelPollEndEvent, ChannelPollEndSubscription, makeChannelPollEndSubscription } from "./channel.poll.end.js"
import { ChannelPollProgressEvent, ChannelPollProgressSubscription, makeChannelPollProgressSubscription } from "./channel.poll.progress.js"
import { ChannelPredictionBeginEvent, ChannelPredictionBeginSubscription, makeChannelPredictionBeginSubscription } from "./channel.prediction.begin.js"
import { ChannelPredictionEndEvent, ChannelPredictionEndSubscription, makeChannelPredictionEndSubscription } from "./channel.prediction.end.js"
import { ChannelPredictionLockEvent, ChannelPredictionLockSubscription, makeChannelPredictionLockSubscription } from "./channel.prediction.lock.js"
import { ChannelPredictionProgressEvent, ChannelPredictionProgressSubscription, makeChannelPredictionProgressSubscription } from "./channel.prediction.progress.js"
import { ChannelRaidEvent, ChannelRaidSubscription, makeChannelRaidSubscription } from "./channel.raid.js"
import { ShieldModeBeginEvent, ShieldModeBeginSubscription, makeShieldModeBeginSubscription } from "./channel.shield_mode.begin.js"
import { ShieldModeEndEvent, ShieldModeEndSubscription, makeShieldModeEndSubscription } from "./channel.shield_mode.end.js"
import { ShoutoutCreateEvent, ShoutoutCreateSubscription, makeShoutoutCreateSubscription } from "./channel.shoutout.create.js"
import { ShoutoutReceiveEvent, ShoutoutReceiveSubscription, makeShoutoutReceiveSubscription } from "./channel.shoutout.receive.js"
import { ChannelSubscribeEvent, ChannelSubscribeSubscription, makeChannelSubscribeSubscription } from "./channel.subscribe.js"
import { ChannelSubscriptionEndEvent, ChannelSubscriptionEndSubscription, makeChannelSubscriptionEndSubscription } from "./channel.subscription.end.js"
import { ChannelSubscriptionGiftEvent, ChannelSubscriptionGiftSubscription, makeChannelSubscriptionGiftSubscription } from "./channel.subscription.gift.js"
import { ChannelSubscriptionMessageEvent, ChannelSubscriptionMessageSubscription, makeChannelSubscriptionMessageSubscription } from "./channel.subscription.message.js"
import { ChannelUnbanEvent, ChannelUnbanSubscription, makeChannelUnbanSubscription } from "./channel.unban.js"
import { ChannelUpdateEvent, ChannelUpdateSubscription, makeChannelUpdateSubscription } from "./channel.update.js"
import { StreamOfflineEvent, StreamOfflineSubscription, makeStreamOfflineSubscription } from "./stream.offline.js"
import { StreamOnlineEvent, StreamOnlineSubscription, makeStreamOnlineSubscription } from "./stream.online.js"
import { UserUpdateEvent, UserUpdateSubscription, makeUserUpdateSubscription } from "./user.update.js"

export * from "./channel.ad_break.begin.js"
export * from "./channel.ban.js"
export * from "./channel.channel_points_custom_reward.add.js"
export * from "./channel.channel_points_custom_reward.remove.js"
export * from "./channel.channel_points_custom_reward.update.js"
export * from "./channel.channel_points_custom_reward_redemption.add.js"
export * from "./channel.channel_points_custom_reward_redemption.update.js"
export * from "./channel.charity_campaign.donate.js"
export * from "./channel.charity_campaign.progress.js"
export * from "./channel.charity_campaign.start.js"
export * from "./channel.charity_campaign.stop.js"
export * from "./channel.chat.clear.js"
export * from "./channel.chat.clear_user_messages.js"
export * from "./channel.chat.message_delete.js"
export * from "./channel.chat.notification.js"
export * from "./channel.cheer.js"
export * from "./channel.follow.js"
export * from "./channel.goal.begin.js"
export * from "./channel.goal.end.js"
export * from "./channel.goal.progress.js"
export * from "./channel.guest_star_guest.update.js"
export * from "./channel.guest_star_session.begin.js"
export * from "./channel.guest_star_session.end.js"
export * from "./channel.guest_star_settings.update.js"
export * from "./channel.hype_train.begin.js"
export * from "./channel.hype_train.end.js"
export * from "./channel.hype_train.progress.js"
export * from "./channel.moderator.add.js"
export * from "./channel.moderator.remove.js"
export * from "./channel.poll.begin.js"
export * from "./channel.poll.end.js"
export * from "./channel.poll.progress.js"
export * from "./channel.prediction.begin.js"
export * from "./channel.prediction.end.js"
export * from "./channel.prediction.lock.js"
export * from "./channel.prediction.progress.js"
export * from "./channel.raid.js"
export * from "./channel.shield_mode.begin.js"
export * from "./channel.shield_mode.end.js"
export * from "./channel.shoutout.create.js"
export * from "./channel.shoutout.receive.js"
export * from "./channel.subscribe.js"
export * from "./channel.subscription.end.js"
export * from "./channel.subscription.gift.js"
export * from "./channel.subscription.message.js"
export * from "./channel.unban.js"
export * from "./channel.update.js"
export * from "./stream.offline.js"
export * from "./stream.online.js"
export * from "./user.update.js"

type AllSubscription =
  | ChannelAdBreakBeginSubscription
  | ChannelBanSubscription
  | ChannelChatClearSubscription
  | ChannelChatClearUserMessagesSubscription
  | ChannelChatMessageDeleteSubscription
  | ChannelChatNotificationSubscription
  | ChannelCheerSubscription
  | ChannelFollowSubscription
  | ChannelGuestStarGuestUpdateSubscription
  | ChannelGuestStarSessionBeginSubscription
  | ChannelGuestStarSessionEndSubscription
  | ChannelGuestStarSettingsUpdateSubscription
  | ChannelModeratorAddSubscription
  | ChannelModeratorRemoveSubscription
  | ChannelPointsCustomRewardAddSubscription
  | ChannelPointsCustomRewardRedemptionAddSubscription
  | ChannelPointsCustomRewardRedemptionUpdateSubscription
  | ChannelPointsCustomRewardRemoveSubscription
  | ChannelPointsCustomRewardUpdateSubscription
  | ChannelPollBeginSubscription
  | ChannelPollEndSubscription
  | ChannelPollProgressSubscription
  | ChannelPredictionBeginSubscription
  | ChannelPredictionEndSubscription
  | ChannelPredictionLockSubscription
  | ChannelPredictionProgressSubscription
  | ChannelRaidSubscription
  | ChannelSubscribeSubscription
  | ChannelSubscriptionEndSubscription
  | ChannelSubscriptionGiftSubscription
  | ChannelSubscriptionMessageSubscription
  | ChannelUnbanSubscription
  | ChannelUpdateSubscription
  | CharityCampaignProgressSubscription
  | CharityCampaignStartSubscription
  | CharityCampaignStopSubscription
  | CharityDonationSubscription
  | GoalBeginSubscription
  | GoalEndSubscription
  | GoalProgressSubscription
  | HypeTrainBeginSubscription
  | HypeTrainEndSubscription
  | HypeTrainProgressSubscription
  | ShieldModeBeginSubscription
  | ShieldModeEndSubscription
  | ShoutoutCreateSubscription
  | ShoutoutReceiveSubscription
  | StreamOfflineSubscription
  | StreamOnlineSubscription
  | UserUpdateSubscription

type AllNotificationMessage =
  | NotificationMessage<ChannelAdBreakBeginSubscription, ChannelAdBreakBeginEvent>
  | NotificationMessage<ChannelBanSubscription, ChannelBanEvent>
  | NotificationMessage<ChannelChatClearSubscription, ChannelChatClearEvent>
  | NotificationMessage<ChannelChatClearUserMessagesSubscription, ChannelChatClearUserMessagesEvent>
  | NotificationMessage<ChannelChatMessageDeleteSubscription, ChannelChatMessageDeleteEvent>
  | NotificationMessage<ChannelChatNotificationSubscription, ChannelChatNotificationEvent>
  | NotificationMessage<ChannelCheerSubscription, ChannelCheerEvent>
  | NotificationMessage<ChannelFollowSubscription, ChannelFollowEvent>
  | NotificationMessage<ChannelGuestStarGuestUpdateSubscription, ChannelGuestStarGuestUpdateEvent>
  | NotificationMessage<ChannelGuestStarSessionBeginSubscription, ChannelGuestStarSessionBeginEvent>
  | NotificationMessage<ChannelGuestStarSessionEndSubscription, ChannelGuestStarSessionEndEvent>
  | NotificationMessage<ChannelGuestStarSettingsUpdateSubscription, ChannelGuestStarSettingsUpdateEvent>
  | NotificationMessage<ChannelModeratorAddSubscription, ChannelModeratorAddEvent>
  | NotificationMessage<ChannelModeratorRemoveSubscription, ChannelModeratorRemoveEvent>
  | NotificationMessage<ChannelPointsCustomRewardAddSubscription, ChannelPointsCustomRewardAddEvent>
  | NotificationMessage<ChannelPointsCustomRewardRedemptionAddSubscription, ChannelPointsCustomRewardRedemptionAddEvent>
  | NotificationMessage<ChannelPointsCustomRewardRedemptionUpdateSubscription, ChannelPointsCustomRewardRedemptionUpdateEvent>
  | NotificationMessage<ChannelPointsCustomRewardRemoveSubscription, ChannelPointsCustomRewardRemoveEvent>
  | NotificationMessage<ChannelPointsCustomRewardUpdateSubscription, ChannelPointsCustomRewardUpdateEvent>
  | NotificationMessage<ChannelPollBeginSubscription, ChannelPollBeginEvent>
  | NotificationMessage<ChannelPollEndSubscription, ChannelPollEndEvent>
  | NotificationMessage<ChannelPollProgressSubscription, ChannelPollProgressEvent>
  | NotificationMessage<ChannelPredictionBeginSubscription, ChannelPredictionBeginEvent>
  | NotificationMessage<ChannelPredictionEndSubscription, ChannelPredictionEndEvent>
  | NotificationMessage<ChannelPredictionLockSubscription, ChannelPredictionLockEvent>
  | NotificationMessage<ChannelPredictionProgressSubscription, ChannelPredictionProgressEvent>
  | NotificationMessage<ChannelRaidSubscription, ChannelRaidEvent>
  | NotificationMessage<ChannelSubscribeSubscription, ChannelSubscribeEvent>
  | NotificationMessage<ChannelSubscriptionEndSubscription, ChannelSubscriptionEndEvent>
  | NotificationMessage<ChannelSubscriptionGiftSubscription, ChannelSubscriptionGiftEvent>
  | NotificationMessage<ChannelSubscriptionMessageSubscription, ChannelSubscriptionMessageEvent>
  | NotificationMessage<ChannelUnbanSubscription, ChannelUnbanEvent>
  | NotificationMessage<ChannelUpdateSubscription, ChannelUpdateEvent>
  | NotificationMessage<CharityCampaignProgressSubscription, CharityCampaignProgressEvent>
  | NotificationMessage<CharityCampaignStartSubscription, CharityCampaignStartEvent>
  | NotificationMessage<CharityCampaignStopSubscription, CharityCampaignStopEvent>
  | NotificationMessage<CharityDonationSubscription, CharityDonationEvent>
  | NotificationMessage<GoalBeginSubscription, GoalBeginEvent>
  | NotificationMessage<GoalEndSubscription, GoalEndEvent>
  | NotificationMessage<GoalProgressSubscription, GoalProgressEvent>
  | NotificationMessage<HypeTrainBeginSubscription, HypeTrainBeginEvent>
  | NotificationMessage<HypeTrainEndSubscription, HypeTrainEndEvent>
  | NotificationMessage<HypeTrainProgressSubscription, HypeTrainProgressEvent>
  | NotificationMessage<ShieldModeBeginSubscription, ShieldModeBeginEvent>
  | NotificationMessage<ShieldModeEndSubscription, ShieldModeEndEvent>
  | NotificationMessage<ShoutoutCreateSubscription, ShoutoutCreateEvent>
  | NotificationMessage<ShoutoutReceiveSubscription, ShoutoutReceiveEvent>
  | NotificationMessage<StreamOfflineSubscription, StreamOfflineEvent>
  | NotificationMessage<StreamOnlineSubscription, StreamOnlineEvent>
  | NotificationMessage<UserUpdateSubscription, UserUpdateEvent>

export type TwitchSubscriptionType = AllSubscription["type"]

export type TwitchSubscription<
  Type extends TwitchSubscriptionType = TwitchSubscriptionType,
> = Extract<AllSubscription, { type: Type }>

export type TwitchNotificationMessage<
  Type extends TwitchSubscriptionType = TwitchSubscriptionType,
> = Extract<AllNotificationMessage, { payload: { type: Type } }>

const subscriptionBuilders: {
  [Type in TwitchSubscriptionType]: (userId: string) => TwitchSubscription<Type>
} = {
  "channel.ad_break.begin": makeChannelAdBreakBeginSubscription,
  "channel.ban": makeChannelBanSubscription,
  "channel.channel_points_custom_reward.add": makeChannelPointsCustomRewardAddSubscription,
  "channel.channel_points_custom_reward.remove": makeChannelPointsCustomRewardRemoveSubscription,
  "channel.channel_points_custom_reward.update": makeChannelPointsCustomRewardUpdateSubscription,
  "channel.channel_points_custom_reward_redemption.add": makeChannelPointsCustomRewardRedemptionAddSubscription,
  "channel.channel_points_custom_reward_redemption.update": makeChannelPointsCustomRewardRedemptionUpdateSubscription,
  "channel.charity_campaign.donate": makeCharityDonationSubscription,
  "channel.charity_campaign.progress": makeCharityCampaignProgressSubscription,
  "channel.charity_campaign.start": makeCharityCampaignStartSubscription,
  "channel.charity_campaign.stop": makeCharityCampaignStopSubscription,
  "channel.chat.clear": makeChannelChatClearSubscription,
  "channel.chat.clear_user_messages": makeChannelChatClearUserMessagesSubscription,
  "channel.chat.message_delete": makeChannelChatMessageDeleteSubscription,
  "channel.chat.notification": makeChannelChatNotificationSubscription,
  "channel.cheer": makeChannelCheerSubscription,
  "channel.follow": makeChannelFollowSubscription,
  "channel.goal.begin": makeGoalBeginSubscription,
  "channel.goal.end": makeGoalEndSubscription,
  "channel.goal.progress": makeGoalProgressSubscription,
  "channel.guest_star_guest.update": makeChannelGuestStarGuestUpdateSubscription,
  "channel.guest_star_session.begin": makeChannelGuestStarSessionBeginSubscription,
  "channel.guest_star_session.end": makeChannelGuestStarSessionEndSubscription,
  "channel.guest_star_settings.update": makeChannelGuestStarSettingsUpdateSubscription,
  "channel.hype_train.begin": makeHypeTrainBeginSubscription,
  "channel.hype_train.end": makeHypeTrainEndSubscription,
  "channel.hype_train.progress": makeHypeTrainProgressSubscription,
  "channel.moderator.add": makeChannelModeratorAddSubscription,
  "channel.moderator.remove": makeChannelModeratorRemoveSubscription,
  "channel.poll.begin": makeChannelPollBeginSubscription,
  "channel.poll.end": makeChannelPollEndSubscription,
  "channel.poll.progress": makeChannelPollProgressSubscription,
  "channel.prediction.begin": makeChannelPredictionBeginSubscription,
  "channel.prediction.end": makeChannelPredictionEndSubscription,
  "channel.prediction.lock": makeChannelPredictionLockSubscription,
  "channel.prediction.progress": makeChannelPredictionProgressSubscription,
  "channel.raid": makeChannelRaidSubscription,
  "channel.shield_mode.begin": makeShieldModeBeginSubscription,
  "channel.shield_mode.end": makeShieldModeEndSubscription,
  "channel.shoutout.create": makeShoutoutCreateSubscription,
  "channel.shoutout.receive": makeShoutoutReceiveSubscription,
  "channel.subscribe": makeChannelSubscribeSubscription,
  "channel.subscription.end": makeChannelSubscriptionEndSubscription,
  "channel.subscription.gift": makeChannelSubscriptionGiftSubscription,
  "channel.subscription.message": makeChannelSubscriptionMessageSubscription,
  "channel.unban": makeChannelUnbanSubscription,
  "channel.update": makeChannelUpdateSubscription,
  "stream.offline": makeStreamOfflineSubscription,
  "stream.online": makeStreamOnlineSubscription,
  "user.update": makeUserUpdateSubscription,
}

export function buildSubscription<
  Type extends TwitchSubscriptionType,
  Subscription extends TwitchSubscription<Type>,
>(type: Type, userId: string): Subscription {
  const creator = subscriptionBuilders[type]
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!creator) {
    throw new Error(`Unknown type ${type}`)
  }

  return creator(userId) as Subscription
}
