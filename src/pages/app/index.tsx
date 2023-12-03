import Scene from '../../r3f/scene';
import Panel from '@/src/panels/globalpanel';
import Display from '@/src/panels/display';
import OutfitPanel from '@/src/panels/outfitPanel';
import LikesList from '@/src/panels/likesList';
import PhotoList from '@/src/panels/photoList';
import SculpturePanel from '@/src/panels/sculpturePanel';
import { useExhibitsStore } from '@/src/store/useExhibitsStore';
import { useOutfitStore } from '@/src/store/useOutfitStore';
import { usePhotoStore } from '@/src/store/usePhotoStore';
import { useGlobalStore } from '@/src/store/useGlobalStore';
// import BGM from '@/src/components/bgm';

function App() {
  const { display, sculpture, likes } = useExhibitsStore();
  const { outfitShow } = useOutfitStore();
  const { photos } = usePhotoStore();
  const { isLoading } = useGlobalStore();


  return (
    <>
      <Scene />
      {!isLoading && <>
        {!outfitShow && !sculpture.hide && <Panel />}
        {display.visible && <Display />}
        {outfitShow && <OutfitPanel />}
        {likes.visible && <LikesList />}
        {photos.visible && <PhotoList />}
        {sculpture.hide && <SculpturePanel />}
        {/* <BGM /> */}
      </>}
    </>
  );
}

export default App;
