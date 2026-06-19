import User from '../models/User.js'

// Define tier hierarchy (higher index = higher tier)
const TIER_LEVELS = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
}

const ACTIVE_STATUSES = ['active', 'trialing']

/**
 * Creates a middleware that gates access based on subscription tier.
 * @param {string} requiredTier - Minimum tier required ('basic', 'pro', 'enterprise')
 */
export const subscriptionGate = (requiredTier = 'pro') => {
  const requiredLevel = TIER_LEVELS[requiredTier]

  if (requiredLevel === undefined) {
    throw new Error(`Invalid subscription tier: ${requiredTier}`)
  }

  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(404).json({ error: 'User not found' })

      const hasActiveSubscription = ACTIVE_STATUSES.includes(user.subscriptionStatus)
      const userLevel = TIER_LEVELS[user.subscriptionTier] ?? 0

      const hasAccess = hasActiveSubscription && userLevel >= requiredLevel

      if (!hasAccess) {
        return res.status(403).json({
          error: `An active ${requiredTier} subscription (or higher) is required for this feature.`,
          requiredTier,
          currentTier: user.subscriptionTier || 'free',
        })
      }

      next()
    } catch (error) {
      console.error('Subscription access check failed:', error)
      res.status(500).json({ error: 'Unable to verify subscription access.' })
    }
  }
}
