import React, { createContext, useContext, useMemo, useState } from 'react'
import { SelectedKeysType } from '../interface'

const defaultData: {
  selectedKeys: SelectedKeysType
} = {
  selectedKeys: []
}

export const FileLibrayContext = createContext<{
  selectedKeys: SelectedKeysType
  updateSelectedKeys: (value: SelectedKeysType) => void
}>({
  selectedKeys: defaultData.selectedKeys,
  updateSelectedKeys(value: SelectedKeysType): void {
    throw new Error('FileLibrayContext not yet initialized.')
  }
})

export const useFileLibrayContext = () => {
  const value = useContext(FileLibrayContext)
  return value
}

export const FileLibrayProvider = ({ children }: { children: React.ReactChild }) => {
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeysType>([])

  const value = useMemo(
    () => ({
      selectedKeys,
      updateSelectedKeys: setSelectedKeys
    }),
    [selectedKeys, setSelectedKeys]
  )

  return <FileLibrayContext.Provider value={value}>{children}</FileLibrayContext.Provider>
}
