WL.registerComponent('tomato', {
    stage01Mesh: { type: WL.Type.Mesh },
    stage02Mesh: { type: WL.Type.Mesh },
    stage03Mesh: { type: WL.Type.Mesh },
    stage04Mesh: { type: WL.Type.Mesh },
    material: { type: WL.Type.Material }
}, {
    name: "Tomato",

    init: function () {
        
        window.game.registerPlant(this);
        this.plantProperties = new PlantType("Tomato", 12);
        this.plantedAt = [];
    },
    start: function () {
    },

    update: function (dt) {

    },

    plant: function (position) {
        // if(!!~this.plantedAt.indexOf(position.toString())){
        //     console.log("Plant already at: "+position);
        //     return;
        // }
        //this.plantedAt.push(position.toString());       

        if (!this.meshes) { //TODO: Move back to start
            this.meshes = [
                this.stage01Mesh,
                this.stage02Mesh,
                this.stage03Mesh,
                this.stage04Mesh
            ];
        };

        let obj = WL.scene.addObject(this.object);
        meshComponent = obj.addComponent('mesh');
        meshComponent.mesh = this.meshes[0];
        meshComponent.material = this.material;

        let growable = obj.addComponent('growable', { 
            growthTime: .5,
            growthChance: .4 
        }); 

        growable.addOnGrow((obj, stage)=> {
            if (stage < 4) {
                let m = obj.getComponent('mesh');
                m.mesh = this.meshes[stage];
            }
        });
        
        obj.plantType = new PlantType("Tomato", 12);

        obj.setTranslationLocal(position);

        return obj;
    }    
});