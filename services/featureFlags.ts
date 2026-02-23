// services/featureFlags.ts — backward-compatible re-export shim
// Singleton state now lives in @bngplayground/engine
export { getFeatureFlags, setFeatureFlags, registerCacheClearCallback } from '@bngplayground/engine';
export type { FeatureFlags } from '@bngplayground/engine';
