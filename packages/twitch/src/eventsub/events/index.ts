import { NotificationMessage } from "../events-helpers"

import { ChannelAdBreakBeginEvent, ChannelAdBreakBeginSubscription, makeChannelAdBreakBeginSubscription } from "./channel.ad_break.begin"
import { ChannelBanEvent, ChannelBanSubscription, makeChannelBanSubscription } from "./channel.ban"
import { ChannelPointsCustomRewardAddEvent, ChannelPointsCustomRewardAddSubscription, makeChannelPointsCustomRewardAddSubscription } from "./channel.channel_points_custom_reward.add"
import { ChannelPointsCustomRewardRemoveEvent, ChannelPointsCustomRewardRemoveSubscription, makeChannelPointsCustomRewardRemoveSubscription } from "./channel.channel_points_custom_reward.remove"
import { ChannelPointsCustomRewardUpdateEvent, ChannelPointsCustomRewardUpdateSubscription, makeChannelPointsCustomRewardUpdateSubscription } from "./channel.channel_points_custom_reward.update"
import { ChannelPointsCustomRewardRedemptionAddEvent, ChannelPointsCustomRewardRedemptionAddSubscription, makeChannelPointsCustomRewardRedemptionAddSubscription } from "./channel.channel_points_custom_reward_redemption.add"
import { ChannelPointsCustomRewardRedemptionUpdateEvent, ChannelPointsCustomRewardRedemptionUpdateSubscription, makeChannelPointsCustomRewardRedemptionUpdateSubscription } from "./channel.channel_points_custom_reward_redemption.update"
import { CharityDonationEvent, CharityDonationSubscription, makeCharityDonationSubscription } from "./channel.charity_campaign.donate"
import { CharityCampaignProgressEvent, CharityCampaignProgressSubscription, makeCharityCampaignProgressSubscription } from "./channel.charity_campaign.progress"
import { CharityCampaignStartEvent, CharityCampaignStartSubscription, makeCharityCampaignStartSubscription } from "./channel.charity_campaign.start"
import { CharityCampaignStopEvent, CharityCampaignStopSubscription, makeCharityCampaignStopSubscription } from "./channel.charity_campaign.stop"
import { ChannelChatClearEvent, ChannelChatClearSubscription, makeChannelChatClearSubscription } from "./channel.chat.clear"
import { ChannelChatClearUserMessagesEvent, ChannelChatClearUserMessagesSubscription, makeChannelChatClearUserMessagesSubscription } from "./channel.chat.clear_user_messages"
import { ChannelChatMessageDeleteEvent, ChannelChatMessageDeleteSubscription, makeChannelChatMessageDeleteSubscription } from "./channel.chat.message_delete"
import { ChannelChatNotificationEvent, ChannelChatNotificationSubscription, makeChannelChatNotificationSubscription } from "./channel.chat.notification"
import { ChannelCheerEvent, ChannelCheerSubscription, makeChannelCheerSubscription } from "./channel.cheer"
import { ChannelFollowEvent, ChannelFollowSubscription, makeChannelFollowSubscription } from "./channel.follow"
import { GoalBeginEvent, GoalBeginSubscription, makeGoalBeginSubscription } from "./channel.goal.begin"
import { GoalEndEvent, GoalEndSubscription, makeGoalEndSubscription } from "./channel.goal.end"
import { GoalProgressEvent, GoalProgressSubscription, makeGoalProgressSubscription } from "./channel.goal.progress"
import { ChannelGuestStarGuestUpdateEvent, ChannelGuestStarGuestUpdateSubscription, makeChannelGuestStarGuestUpdateSubscription } from "./channel.guest_star_guest.update"
import { ChannelGuestStarSessionBeginEvent, ChannelGuestStarSessionBeginSubscription, makeChannelGuestStarSessionBeginSubscription } from "./channel.guest_star_session.begin"
import { ChannelGuestStarSessionEndEvent, ChannelGuestStarSessionEndSubscription, makeChannelGuestStarSessionEndSubscription } from "./channel.guest_star_session.end"
import { ChannelGuestStarSettingsUpdateEvent, ChannelGuestStarSettingsUpdateSubscription, makeChannelGuestStarSettingsUpdateSubscription } from "./channel.guest_star_settings.update"
import { HypeTrainBeginEvent, HypeTrainBeginSubscription, makeHypeTrainBeginSubscription } from "./channel.hype_train.begin"
import { HypeTrainEndEvent, HypeTrainEndSubscription, makeHypeTrainEndSubscription } from "./channel.hype_train.end"
import { HypeTrainProgressEvent, HypeTrainProgressSubscription, makeHypeTrainProgressSubscription } from "./channel.hype_train.progress"
import { ChannelModeratorAddEvent, ChannelModeratorAddSubscription, makeChannelModeratorAddSubscription } from "./channel.moderator.add"
import { ChannelModeratorRemoveEvent, ChannelModeratorRemoveSubscription, makeChannelModeratorRemoveSubscription } from "./channel.moderator.remove"
import { ChannelPollBeginEvent, ChannelPollBeginSubscription, makeChannelPollBeginSubscription } from "./channel.poll.begin"
import { ChannelPollEndEvent, ChannelPollEndSubscription, makeChannelPollEndSubscription } from "./channel.poll.end"
import { ChannelPollProgressEvent, ChannelPollProgressSubscription, makeChannelPollProgressSubscription } from "./channel.poll.progress"
import { ChannelPredictionBeginEvent, ChannelPredictionBeginSubscription, makeChannelPredictionBeginSubscription } from "./channel.prediction.begin"
import { ChannelPredictionEndEvent, ChannelPredictionEndSubscription, makeChannelPredictionEndSubscription } from "./channel.prediction.end"
import { ChannelPredictionLockEvent, ChannelPredictionLockSubscription, makeChannelPredictionLockSubscription } from "./channel.prediction.lock"
import { ChannelPredictionProgressEvent, ChannelPredictionProgressSubscription, makeChannelPredictionProgressSubscription } from "./channel.prediction.progress"
import { ChannelRaidEvent, ChannelRaidSubscription, makeChannelRaidSubscription } from "./channel.raid"
import { ShieldModeBeginEvent, ShieldModeBeginSubscription, makeShieldModeBeginSubscription } from "./channel.shield_mode.begin"
import { ShieldModeEndEvent, ShieldModeEndSubscription, makeShieldModeEndSubscription } from "./channel.shield_mode.end"
import { ShoutoutCreateEvent, ShoutoutCreateSubscription, makeShoutoutCreateSubscription } from "./channel.shoutout.create"
import { ShoutoutReceiveEvent, ShoutoutReceiveSubscription, makeShoutoutReceiveSubscription } from "./channel.shoutout.receive"
import { ChannelSubscribeEvent, ChannelSubscribeSubscription, makeChannelSubscribeSubscription } from "./channel.subscribe"
import { ChannelSubscriptionEndEvent, ChannelSubscriptionEndSubscription, makeChannelSubscriptionEndSubscription } from "./channel.subscription.end"
import { ChannelSubscriptionGiftEvent, ChannelSubscriptionGiftSubscription, makeChannelSubscriptionGiftSubscription } from "./channel.subscription.gift"
import { ChannelSubscriptionMessageEvent, ChannelSubscriptionMessageSubscription, makeChannelSubscriptionMessageSubscription } from "./channel.subscription.message"
import { ChannelUnbanEvent, ChannelUnbanSubscription, makeChannelUnbanSubscription } from "./channel.unban"
import { ChannelUpdateEvent, ChannelUpdateSubscription, makeChannelUpdateSubscription } from "./channel.update"
import { StreamOfflineEvent, StreamOfflineSubscription, makeStreamOfflineSubscription } from "./stream.offline"
import { StreamOnlineEvent, StreamOnlineSubscription, makeStreamOnlineSubscription } from "./stream.online"
import { UserUpdateEvent, UserUpdateSubscription, makeUserUpdateSubscription } from "./user.update"

export * from "./channel.ad_break.begin"
export * from "./channel.ban"
export * from "./channel.channel_points_custom_reward.add"
export * from "./channel.channel_points_custom_reward.remove"
export * from "./channel.channel_points_custom_reward.update"
export * from "./channel.channel_points_custom_reward_redemption.add"
export * from "./channel.channel_points_custom_reward_redemption.update"
export * from "./channel.charity_campaign.donate"
export * from "./channel.charity_campaign.progress"
export * from "./channel.charity_campaign.start"
export * from "./channel.charity_campaign.stop"
export * from "./channel.chat.clear"
export * from "./channel.chat.clear_user_messages"
export * from "./channel.chat.message_delete"
export * from "./channel.chat.notification"
export * from "./channel.cheer"
export * from "./channel.follow"
export * from "./channel.goal.begin"
export * from "./channel.goal.end"
export * from "./channel.goal.progress"
export * from "./channel.guest_star_guest.update"
export * from "./channel.guest_star_session.begin"
export * from "./channel.guest_star_session.end"
export * from "./channel.guest_star_settings.update"
export * from "./channel.hype_train.begin"
export * from "./channel.hype_train.end"
export * from "./channel.hype_train.progress"
export * from "./channel.moderator.add"
export * from "./channel.moderator.remove"
export * from "./channel.poll.begin"
export * from "./channel.poll.end"
export * from "./channel.poll.progress"
export * from "./channel.prediction.begin"
export * from "./channel.prediction.end"
export * from "./channel.prediction.lock"
export * from "./channel.prediction.progress"
export * from "./channel.raid"
export * from "./channel.shield_mode.begin"
export * from "./channel.shield_mode.end"
export * from "./channel.shoutout.create"
export * from "./channel.shoutout.receive"
export * from "./channel.subscribe"
export * from "./channel.subscription.end"
export * from "./channel.subscription.gift"
export * from "./channel.subscription.message"
export * from "./channel.unban"
export * from "./channel.update"
export * from "./stream.offline"
export * from "./stream.online"
export * from "./user.update"

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
