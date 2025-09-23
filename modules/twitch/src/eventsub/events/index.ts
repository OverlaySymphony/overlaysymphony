import { type NotificationMessage } from "../events-helpers.js"

import { type ChannelAdBreakBeginEvent, type ChannelAdBreakBeginSubscription, makeChannelAdBreakBeginSubscription } from "./channel.ad_break.begin.js"
import { type ChannelBanEvent, type ChannelBanSubscription, makeChannelBanSubscription } from "./channel.ban.js"
import { type ChannelPointsCustomRewardAddEvent, type ChannelPointsCustomRewardAddSubscription, makeChannelPointsCustomRewardAddSubscription } from "./channel.channel_points_custom_reward.add.js"
import { type ChannelPointsCustomRewardRemoveEvent, type ChannelPointsCustomRewardRemoveSubscription, makeChannelPointsCustomRewardRemoveSubscription } from "./channel.channel_points_custom_reward.remove.js"
import { type ChannelPointsCustomRewardUpdateEvent, type ChannelPointsCustomRewardUpdateSubscription, makeChannelPointsCustomRewardUpdateSubscription } from "./channel.channel_points_custom_reward.update.js"
import { type ChannelPointsCustomRewardRedemptionAddEvent, type ChannelPointsCustomRewardRedemptionAddSubscription, makeChannelPointsCustomRewardRedemptionAddSubscription } from "./channel.channel_points_custom_reward_redemption.add.js"
import { type ChannelPointsCustomRewardRedemptionUpdateEvent, type ChannelPointsCustomRewardRedemptionUpdateSubscription, makeChannelPointsCustomRewardRedemptionUpdateSubscription } from "./channel.channel_points_custom_reward_redemption.update.js"
import { type CharityDonationEvent, type CharityDonationSubscription, makeCharityDonationSubscription } from "./channel.charity_campaign.donate.js"
import { type CharityCampaignProgressEvent, type CharityCampaignProgressSubscription, makeCharityCampaignProgressSubscription } from "./channel.charity_campaign.progress.js"
import { type CharityCampaignStartEvent, type CharityCampaignStartSubscription, makeCharityCampaignStartSubscription } from "./channel.charity_campaign.start.js"
import { type CharityCampaignStopEvent, type CharityCampaignStopSubscription, makeCharityCampaignStopSubscription } from "./channel.charity_campaign.stop.js"
import { type ChannelChatClearEvent, type ChannelChatClearSubscription, makeChannelChatClearSubscription } from "./channel.chat.clear.js"
import { type ChannelChatClearUserMessagesEvent, type ChannelChatClearUserMessagesSubscription, makeChannelChatClearUserMessagesSubscription } from "./channel.chat.clear_user_messages.js"
import { type ChannelChatMessageDeleteEvent, type ChannelChatMessageDeleteSubscription, makeChannelChatMessageDeleteSubscription } from "./channel.chat.message_delete.js"
import { type ChannelChatNotificationEvent, type ChannelChatNotificationSubscription, makeChannelChatNotificationSubscription } from "./channel.chat.notification.js"
import { type ChannelCheerEvent, type ChannelCheerSubscription, makeChannelCheerSubscription } from "./channel.cheer.js"
import { type ChannelFollowEvent, type ChannelFollowSubscription, makeChannelFollowSubscription } from "./channel.follow.js"
import { type GoalBeginEvent, type GoalBeginSubscription, makeGoalBeginSubscription } from "./channel.goal.begin.js"
import { type GoalEndEvent, type GoalEndSubscription, makeGoalEndSubscription } from "./channel.goal.end.js"
import { type GoalProgressEvent, type GoalProgressSubscription, makeGoalProgressSubscription } from "./channel.goal.progress.js"
import { type ChannelGuestStarGuestUpdateEvent, type ChannelGuestStarGuestUpdateSubscription, makeChannelGuestStarGuestUpdateSubscription } from "./channel.guest_star_guest.update.js"
import { type ChannelGuestStarSessionBeginEvent, type ChannelGuestStarSessionBeginSubscription, makeChannelGuestStarSessionBeginSubscription } from "./channel.guest_star_session.begin.js"
import { type ChannelGuestStarSessionEndEvent, type ChannelGuestStarSessionEndSubscription, makeChannelGuestStarSessionEndSubscription } from "./channel.guest_star_session.end.js"
import { type ChannelGuestStarSettingsUpdateEvent, type ChannelGuestStarSettingsUpdateSubscription, makeChannelGuestStarSettingsUpdateSubscription } from "./channel.guest_star_settings.update.js"
import { type HypeTrainBeginEvent, type HypeTrainBeginSubscription, makeHypeTrainBeginSubscription } from "./channel.hype_train.begin.js"
import { type HypeTrainEndEvent, type HypeTrainEndSubscription, makeHypeTrainEndSubscription } from "./channel.hype_train.end.js"
import { type HypeTrainProgressEvent, type HypeTrainProgressSubscription, makeHypeTrainProgressSubscription } from "./channel.hype_train.progress.js"
import { type ChannelModeratorAddEvent, type ChannelModeratorAddSubscription, makeChannelModeratorAddSubscription } from "./channel.moderator.add.js"
import { type ChannelModeratorRemoveEvent, type ChannelModeratorRemoveSubscription, makeChannelModeratorRemoveSubscription } from "./channel.moderator.remove.js"
import { type ChannelPollBeginEvent, type ChannelPollBeginSubscription, makeChannelPollBeginSubscription } from "./channel.poll.begin.js"
import { type ChannelPollEndEvent, type ChannelPollEndSubscription, makeChannelPollEndSubscription } from "./channel.poll.end.js"
import { type ChannelPollProgressEvent, type ChannelPollProgressSubscription, makeChannelPollProgressSubscription } from "./channel.poll.progress.js"
import { type ChannelPredictionBeginEvent, type ChannelPredictionBeginSubscription, makeChannelPredictionBeginSubscription } from "./channel.prediction.begin.js"
import { type ChannelPredictionEndEvent, type ChannelPredictionEndSubscription, makeChannelPredictionEndSubscription } from "./channel.prediction.end.js"
import { type ChannelPredictionLockEvent, type ChannelPredictionLockSubscription, makeChannelPredictionLockSubscription } from "./channel.prediction.lock.js"
import { type ChannelPredictionProgressEvent, type ChannelPredictionProgressSubscription, makeChannelPredictionProgressSubscription } from "./channel.prediction.progress.js"
import { type ChannelRaidEvent, type ChannelRaidSubscription, makeChannelRaidSubscription } from "./channel.raid.js"
import { type ShieldModeBeginEvent, type ShieldModeBeginSubscription, makeShieldModeBeginSubscription } from "./channel.shield_mode.begin.js"
import { type ShieldModeEndEvent, type ShieldModeEndSubscription, makeShieldModeEndSubscription } from "./channel.shield_mode.end.js"
import { type ShoutoutCreateEvent, type ShoutoutCreateSubscription, makeShoutoutCreateSubscription } from "./channel.shoutout.create.js"
import { type ShoutoutReceiveEvent, type ShoutoutReceiveSubscription, makeShoutoutReceiveSubscription } from "./channel.shoutout.receive.js"
import { type ChannelSubscribeEvent, type ChannelSubscribeSubscription, makeChannelSubscribeSubscription } from "./channel.subscribe.js"
import { type ChannelSubscriptionEndEvent, type ChannelSubscriptionEndSubscription, makeChannelSubscriptionEndSubscription } from "./channel.subscription.end.js"
import { type ChannelSubscriptionGiftEvent, type ChannelSubscriptionGiftSubscription, makeChannelSubscriptionGiftSubscription } from "./channel.subscription.gift.js"
import { type ChannelSubscriptionMessageEvent, type ChannelSubscriptionMessageSubscription, makeChannelSubscriptionMessageSubscription } from "./channel.subscription.message.js"
import { type ChannelUnbanEvent, type ChannelUnbanSubscription, makeChannelUnbanSubscription } from "./channel.unban.js"
import { type ChannelUpdateEvent, type ChannelUpdateSubscription, makeChannelUpdateSubscription } from "./channel.update.js"
import { type StreamOfflineEvent, type StreamOfflineSubscription, makeStreamOfflineSubscription } from "./stream.offline.js"
import { type StreamOnlineEvent, type StreamOnlineSubscription, makeStreamOnlineSubscription } from "./stream.online.js"
import { type UserUpdateEvent, type UserUpdateSubscription, makeUserUpdateSubscription } from "./user.update.js"

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
  if (!creator) {
    throw new Error(`Unknown type ${type}`)
  }

  return creator(userId) as Subscription
}
