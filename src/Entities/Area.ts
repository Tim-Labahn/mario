import { ref } from 'vue'

export const currentArea = ref<AreaName>('entrance')
export type Area = (typeof areas.value)[keyof typeof areas.value]

type AreaName = 'entrance' | 'floor1'

export const areas = ref<
  Record<
    AreaName,
    {
      width: number
      height: number
      npcs: number[]
      enemies: number[]
      floorImage: string
      portals: {
        id: number
        position: [number, number]
        targetArea: AreaName
        targetPortalId: number
        blocked: boolean
      }[]
    }
  >
>({
  entrance: {
    width: 15,
    height: 10,
    npcs: [1, 2],
    enemies: [3],
    floorImage: 'environment/spawn_floor.png',
    portals: [
      {
        id: 1,
        position: [6, 1],
        targetArea: 'floor1',
        targetPortalId: 1,
        blocked: false,
      },
    ],
  },
  floor1: {
    width: 15,
    height: 10,
    npcs: [],
    enemies: [1, 2],
    floorImage: 'environment/town_floor.png',
    portals: [
      {
        id: 1,
        position: [6, 10],
        targetArea: 'entrance',
        targetPortalId: 1,
        blocked: false,
      },
    ],
  },
})
