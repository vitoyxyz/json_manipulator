<template>
<div>
    <div class="form">
    <form  ref="form" @submit.prevent="submitForm" class="registration">
      <label for="tag">
        <p>Tag <span class="required"> *</span></p>

        <input type="text" v-model="form.tag" />
      </label>
 
        <label for="pattern">
          <p>Pattern <span class="required"> *</span> <button class="add"> Add </button></p>
          <input type="text" v-model="form.pattern" />
        </label>
    

      <label for="responces">
        <p>Responces <span class="required"> *</span>  <button class="add"> Add </button></p>
        <input type="text" v-model="form.responces" />
      </label>

      <label for="context-set">
        <p>Context Set</p>
        <input type="text" v-model="form.context_set" />
      </label>
      <label for="context-filter">
        <p>Context Filter</p>
        <input type="text" v-model="form.context_filter"/>
      </label>
       
    </form>
   
  </div>
  <div class="btns">
   <button class="btn-clear" @click="clearForm()"> Clear Input </button>
     <button class="btn-submit" @click="submitForm()" type="submit"> Submit </button>
     </div>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
   return {
     form: {
       tag: "",
       pattern: "",
       responces: "",
       context_set: "",
       context_filter: ""
     }

   }
      
    
  },
  methods: {
    clearForm(){
    this.$refs.form.reset(); 
    
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pattern {
  position: relative;
}

.add {
  display: inline;
}

.registration {
  margin: 0 auto;
}
label p{
  font-size: 18px;
  font-weight: 600;
}

input {
  height: 44px;
  width: 350px;
  max-width: 100%;
  margin-right: 10px;
  outline: none;
  border: 1px solid #d1d3d4;
}
.btns{
 max-width: 350px;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
  
}
.btn-clear{
   color: #ffffff;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 120px;
  border: 1px solid #228B22;
  background-color: #228B22;
  float: left;
  margin-left: -9px;
}

.btn-submit{
   color: #ffffff;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 120px;
  border: 1px solid #DC143C;
  background-color:#DC143C;
   float: right;
}

.add{
 color: #ffffff;
  box-sizing: border-box;
  font-size: 15px;
  height: 30px;
  width: 50px;
  border: 1px solid #DC143C;
  background-color:#DC143C;
  float:right;
  margin-right: 12px;
}
.required {
  color: #f50537;
  size: 15px;
  line-height: 20px;
}
</style>>



