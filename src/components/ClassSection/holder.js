import { SkeletonContainer, HolderItem } from './style';

const ClassSectionHolder = () => {
    return (
        <SkeletonContainer>
            <HolderItem height="100%" width="120px"></HolderItem>
            <HolderItem height="100%"></HolderItem>
            <HolderItem height="100%"></HolderItem>
            <HolderItem height="100%" width="220px"></HolderItem>
        </SkeletonContainer>
    );
};

export default ClassSectionHolder;
