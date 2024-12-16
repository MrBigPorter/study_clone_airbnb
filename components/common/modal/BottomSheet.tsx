import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetProps } from '@/types/modalTypes';

export default function BottomSheetModal({
  children,
  style,
  snapPoints = ['3%', '100%'],
  onChange,
  backgroundStyle,
  handleIndicatorStyle,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointsArray = snapPoints.map((point) => point.toString());  
  // 自定义手柄
  const renderHandle = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.handle} />
      </View>
    ),
    []
  );

  // 自定义背景
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPointsArray}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={false}
      enableOverDrag={true}
      animateOnMount={true}
      backgroundStyle={backgroundStyle??styles.background}
      handleIndicatorStyle={handleIndicatorStyle??{display:'none'}}
      onChange={(index) => {
       onChange?.(index)
      }}
      style={[
        {
          ...Platform.select({
            android: {
              elevation: 50,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.1)',
              marginTop: -53,
            },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              marginTop: -53,
            },
          }),
        },
        style,
      ]}
    >
      {children}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#00000030',
    alignSelf: 'center',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
  },
});
