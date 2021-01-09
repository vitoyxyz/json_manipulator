<template>
<div>
    <div class="form">
    <form  ref="form" @submit.prevent="submitForm" class="inputs">
      <label for="tag">
        <p>Tag <span class="required"> *</span></p>

        <input  ref="tag" :class="{ 'is-invalid': submitted && $v.form.tag.$error }" type="text" v-model="form.tag" />
      </label>
 
        <label for="pattern">
          <p>Pattern <span class="required"> *</span> <button @click="addPattern()" class="add"> Add </button></p>
          <input  ref="pattern" :class="{ 'is-invalid': submitted && $v.form.pattern.$error }" type="text" v-model="pattern" />
        </label>
    
    
      <label for="responses">
        <p>Responses <span class="required"> *</span>  <button @click="addResponse()" class="add"> Add </button></p>
        <input ref="responses" :class="{ 'is-invalid':  submitted &&  $v.form.responses.$error }" type="text" v-model="responses" />
      </label>

      <label for="context-set">
        <p>Context Set</p>
        <input  ref="context-set" type="text" v-model="form.context_set" />
      </label>
      <label for="context-filter">
        <p>Context Filter</p>
        <input ref="context-filter" type="text" v-model="form.context_filter"/>
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: "App",
    mixins: [validationMixin],
  data() {
   return {
     form: {
       tag: "",
       pattern: [] ,
       responses: [],
       context_set: "",
       context_filter: ""
     },
     submitted: false,
     pattern: [],
     responses: []
   }
   
    
  },
  validations: {
    form: {
    tag: {
      required,
      
    },
    pattern: {
     required
          },
           responses: {
     required
          }
    },

  },
  methods: {
    clearForm(){
    this.form.tag = '';
    this.form.pattern = [];
    this.form.responses = [];
    this.form.context_set = "";
    this.form.context_filter = "";

        },
        submitForm(){
           this.submitted = true;
             this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      axios.post('//localhost:3030/create_entry,', this.form)
    .then((response) => {
           this.submitted = true;
  console.log(response);
}, (error) => {
  console.log(error);
});
        },
         addPattern(){
           if(this.pattern !== ""){
         this.form.pattern.push( this.pattern); 
         this.pattern = "";   
           }
        },
        addResponse(){
          if(this.responses !== ""){
           this.form.responses.push( this.responses);
           this.responses = "";   
          }
           
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

.inputs {
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
input.is-invalid {
  border-color: red;
}

.invalid {
  color: red;
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



