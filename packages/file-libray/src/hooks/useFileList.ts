import { useFileLibrayContext } from '../provider/provider'
import { SelectedKeysType } from '../interface'

export const useFileList = () => {
  const { selectedKeys, updateSelectedKeys } = useFileLibrayContext()

  const handleSelectItem = (key: number) => {
    updateSelectedKeys([...modifSelectedKeys(selectedKeys, key)])
  }

  const modifSelectedKeys = (selectedKeys: SelectedKeysType, key: number) => {
    const index = selectedKeys.indexOf(key)
    if (index >= 0) {
      selectedKeys.splice(index, 1)
    } else {
      selectedKeys.push(key)
    }
    return selectedKeys
  }

  return { handleSelectItem, selectedKeys }
}
