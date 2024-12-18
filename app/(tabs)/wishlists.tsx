import { useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomCustomActionSheet from '@/components/common/modal/BottomCustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';

const Wishlists = () => {
    const bottomFilterActionSheetRef = useRef<ActionSheetRef>(null)
  return (
    <View>
        <Button title='Show Action Sheet' onPress={()=>{
            bottomFilterActionSheetRef.current?.show()
        }}/>
        <BottomCustomActionSheet ref={bottomFilterActionSheetRef}>
            <Text>Hi, I am here.</Text>
        </BottomCustomActionSheet>
      {/* <ActionSheet
        containerStyle={{
            backgroundColor:'red',
            height:'100%',
            zIndex:1000,
        }}
        indicatorStyle={{
            backgroundColor:'blue',
            width:'100%',
        }}
        gestureEnabled={true}
        drawUnderStatusBar={false}
        useBottomSafeAreaPadding={true}
        isModal={true}
        ref={actionSheetRef}
        snapPoints={[100]}
        elevation={5}
        overlayColor='rgba(0,0,0,0.9)'
        defaultOverlayOpacity={0.5}
        closeOnTouchBackdrop={true}
        onClose={()=>{
          console.log('onClose')
        }}
        onOpen={()=>{
          console.log('onOpen')
        }}
        onBeforeShow={()=>{
          console.log('onBeforeShow')
        }}
        onBeforeClose={()=>{
          console.log('onBeforeClose')
        }}
      >
        <View>
          <Text>Hi, I am here.</Text>
          <Button
            title="Close"
            onPress={() => actionSheetRef.current?.hide()}
          />
        </View>
      </ActionSheet> */}
    </View>
  );
};
export default Wishlists;
