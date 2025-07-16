import type { OIDCConfig } from '@auth/core/providers';

import { CommonProviderConfig } from './sso.config';

export interface DivZenProfile {
  authorities?: string[];
  group?: string[];
  sub?: string;
  userId?: string;
}

/**
 * Custom DivZen SSO provider (OIDC compatible)
 *
 * Environment variables required:
 * - DIVZEN_CLIENT_ID
 * - DIVZEN_CLIENT_SECRET
 */
const provider = {
  id: 'divzen',
  provider: {
    ...CommonProviderConfig,
    authorization: { params: { scope: 'openid' } },
    checks: ['state', 'pkce'],
    clientId: process.env.DIVZEN_CLIENT_ID,
    clientSecret: process.env.DIVZEN_CLIENT_SECRET,
    id: 'divzen',
    issuer: 'https://divzen.uat.turtle.deckers.com',
    name: 'divZen SSO',
    profile(profile: DivZenProfile) {
      // console.log('profile>>>', profile)

      if (!profile.group || !profile.group.includes('gpt user group')) {
        // 抛出异常，NextAuth 会处理为登录失败
        throw new Error('AccessDenied');
      }
      // console.log('校验通过>>>', profile)

      return {
        authorities: profile.authorities,
        id: profile.userId,
        name: profile.sub,
        // Preserve authorities for downstream usage (optional custom property)
        providerAccountId: profile.userId,
      } as any;
    },
    type: 'oidc',
    wellKnown: 'https://divzen.uat.turtle.deckers.com/.well-known/openid-configuration',
  } satisfies OIDCConfig<DivZenProfile>,
};

export default provider;
