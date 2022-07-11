import { SkeletonContainer, HolderItem } from './style';

const ClassSectionHolder = () => {
    return (
        <SkeletonContainer>
            <HolderItem height="26px" width="120px"></HolderItem>
            <HolderItem height="67.38px"></HolderItem>
            <HolderItem height="42px" width="220px"></HolderItem>
        </SkeletonContainer>
    );
};

export default ClassSectionHolder;
