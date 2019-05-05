pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
contract DecentralizedVideoStorage is Ownable { 

    address admin;    
    struct videoDetail {
        address uploadedBy;
        uint creationTime;
        bytes32 secureHash;
        string videoName;
    }
    videoDetail[] private videos;
    
    // function DecentralizedVideoStorage () public { // constructor
    //     admin = msg.sender;
    //     allowedAddresses[msg.sender] = true;
    // }
    
    constructor () public { // constructor
        admin = msg.sender;
        allowedAddresses[msg.sender] = true;
    }
    
    modifier onlyOwnerOfContract() {
        require(msg.sender == admin);
        _;
    }
    
    event videoHashUploaded(
        address _uploadedBy,
        string videoName
    );
       
    // mapping(address => videoDetail) addressToVideo;
    // mappings
    mapping(address => bool) public allowedAddresses;
    
    mapping (uint => address) public videoToOwner;
    
    mapping (address => uint) public ownerVideoCount;

    mapping(address => uint[]) myVideosIndexes;
    
    //was going to be used for o/p but seems unlikely
    // mapping (address => videoDetail[]) public videoss;
    
    function registerAddress(address _newAllowedAddress) public onlyOwnerOfContract { //TODO: make it payable
        allowedAddresses[_newAllowedAddress] = true;
    }

    function getUserVideoIndexes() public view returns (uint[]){
        require(allowedAddresses[msg.sender],"Access Denied");
        return myVideosIndexes[msg.sender];
    }

    function getVideosCount() public view onlyOwnerOfContract returns (uint){
        return videos.length;
    }
    
    function getVideoByIndex(uint256 index) public view returns (address,uint,bytes32,string){
        require(msg.sender==admin || videoToOwner[index]==msg.sender,"Access Denied.");
        videoDetail storage video = videos[index];
        return (
            video.uploadedBy,
            video.creationTime,
            video.secureHash,
            video.videoName
        );
    }
    
    function addVideo(string memory _videoName,bytes32 _secureHash) public returns(bool) { //TODO: make it payable
        require(allowedAddresses[msg.sender] == true,"Access Denied.");
        uint id = videos.push(videoDetail(msg.sender,now, _secureHash,_videoName)) - 1;
        videoToOwner[id] = msg.sender;
        ownerVideoCount[msg.sender]++;
        myVideosIndexes[msg.sender].push(id);
        //event fired
        emit videoHashUploaded(msg.sender,_videoName);
        
        return true;
    }
    
    //* This function for administartion to get video hash by owner
    function getVideosByOwner(address _owner) public view returns(videoDetail[] memory) {
        require(ownerVideoCount[_owner] >= 1,"No Videos");
        videoDetail[] memory returnvideos = new videoDetail[](ownerVideoCount[_owner]);
        uint len = videos.length;
        uint k=0;
        for(uint i=0;i<len;i++){
            if(videoToOwner[i] == _owner){
                returnvideos[k] = videos[i];
                k++;
            }
        }
    
        return returnvideos;
    }
    
    //*
    function getYourVideos() public view returns(videoDetail[] memory) {
        require(ownerVideoCount[msg.sender] >= 1);
        assert(allowedAddresses[msg.sender] == true);//can never be false
        videoDetail[] memory returnvideos = new videoDetail[](ownerVideoCount[msg.sender]);
        uint totalLengthOfVideoStorage = videos.length;
        uint k = 0;
        for(uint i=0; i < totalLengthOfVideoStorage; i++){
            if(videoToOwner[i] == msg.sender){
                returnvideos[k] =videos[i];
                k++;
            }
        }
    
        return returnvideos;
    }

    
    
}