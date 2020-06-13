class AnimationPack
{

    constructor(dataArray, frameDelay, bLoop)
    {

        this.dataArray = dataArray;
        this.numOfFrames = dataArray.length;
        this.currFrameId = 0;
        this.frameDelay = frameDelay;
        this.frameTimeLeft = frameDelay;
        this.bLoop = bLoop; 

        this.bActive = false;

        console.log(this.dataArray);
        this.currImg = this.dataArray[0];

    }

    startAnim()
    {
        this.bActive = true;
        this.currImg = this.dataArray[0];
    }

    stopAnim()
    {
        this.bActive = false;
    }

    render(position, size)
    {

        if (!this.bActive)
        {
            return;
        }

        this.frameTimeLeft = this.frameTimeLeft - deltaTime;

        if (this.frameTimeLeft <= 0)
        {
        
            this.currFrameId = this.currFrameId + 1;
            if (this.currFrameId == this.numOfFrames)
            {
                this.currFrameId = 0
                if (!this.bLoop)
                {
                    this.bActive = false;
                    return;
                }
            }

            this.currImg = this.dataArray[this.currFrameId];    
            this.frameTimeLeft = this.frameDelay;
            
        }

        console.log(this.currImg);
        console.log(position);
        console.log(size);
        image(this.currImg, position.x, position.y, size.x, size.y);

    }

}