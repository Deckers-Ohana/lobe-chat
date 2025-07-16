'use client';

import { ChatHeader } from '@lobehub/ui/chat';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

import HeaderAction from './HeaderAction';
import Main from './Main';

const Header = () => {
  const showHeader = useGlobalStore(systemStatusSelectors.showChatHeader);

  return (
    showHeader && (
      <Flexbox align={'start'} gap={8} horizontal={false}>
        <ChatHeader
          left={<Main />}
          right={<HeaderAction />}
          style={{ paddingInline: 8, position: 'initial', zIndex: 11 }}
        />
        <div style={{ color: '#c10251', fontSize: 16, padding: 8 }}>
          !!Caution!! Do not enter sensitive or proprietary information into this chat window.
        </div>
      </Flexbox>
    )
  );
};

export default Header;
