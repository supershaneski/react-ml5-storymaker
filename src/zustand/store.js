import create from 'zustand'

const useStoryStore = create((set) => ({
  curIndex: -1,
  story: [],
  setIndex: (_index) => set((state) => ({ curIndex: _index })),
  setStory: (_story) => set((state) => ({ story: _story })),
  resetStory: () => set({ story: [], curIndex: -1, }),
}))

export default useStoryStore