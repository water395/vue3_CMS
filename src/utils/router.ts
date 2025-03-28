//对象映射构建树形结构
export function buildTreeEfficient(items: any[]) {
  const itemMap: any = {}
  const tree: any[] = []

  //首先创建所有项的映射
  items.forEach((item: any) => {
    itemMap[item.id] = { ...item, children: [] }
  })

  console.log(itemMap)

  //构建树结构
  items.forEach((item: any) => {
    if (item.parentId === null || item.parentId === 0) {
      tree.push(itemMap[item.id])
    } else {
      if (itemMap[item.parentId]) {
        itemMap[item.parentId].children.push(itemMap[item.id])
      }
    }
  })

  return tree
}

export function traverseTree(id: any, targetArray: any[]): any | null {
  for (let i = 0; i < targetArray.length; i++) {
    const element = targetArray[i]

    if (element.path === id) {
      return element
    }

    if (element.children) {
      const found = traverseTree(id, element.children)

      if (found) {
        return found
      }
    }
  }

  return null
}

//获取项目view路由表
export function getLocalViewRoute() {
  const files: Record<string, any> = import.meta.glob('../router/modules/*.ts', { eager: true })
  const routerList: any[] = []

  Object.keys(files).forEach((key) => {
    routerList.push(files[key].default)
  })

  return routerList
}
