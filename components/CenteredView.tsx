import React from 'react'
import { SafeAreaView } from 'react-native';

interface CenteredViewProps {
    children: React.ReactNode
}

export default function CenteredView({ children }: CenteredViewProps) {
  return (
    <SafeAreaView style={{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        {children}
    </SafeAreaView>
  )
}
