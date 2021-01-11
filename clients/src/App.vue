<template>
  <div class="app">
    <div class="form">
      <form ref="form" @submit.prevent="submitForm" class="inputs">
        <label for="tag">
          <p>Tag <span class="required"> *</span></p>

          <input
            ref="tag"
            :class="{ 'is-invalid': submitted && $v.form.tag.$error }"
            type="text"
            v-model="form.tag"
          />
        </label>

        <label for="pattern">
          <p>
            Pattern <span class="required"> *</span>
            <button @click="addPattern()" type="button" class="add">Add</button>
          </p>
          <input
            ref="pattern"
            :class="{ 'is-invalid': submitted && $v.pattern.$error }"
            type="text"
            v-model="pattern"
          />
        </label>

        <label for="response">
          <p>
            Responses <span class="required"> *</span>
            <button @click="addResponse()" type="button" class="add">
              Add
            </button>
          </p>
          <input
            ref="response"
            :class="{ 'is-invalid': submitted && $v.response.$error }"
            type="text"
            v-model="response"
          />
        </label>

        <label for="context-set">
          <p>Context Set</p>
          <input ref="context-set" type="text" v-model="form.context_set" />
        </label>
        <label for="context-filter">
          <p>Context Filter</p>
          <input
            ref="context-filter"
            type="text"
            v-model="form.context_filter"
          />
        </label>
      </form>
    </div>
    <div class="btns">
      <button class="btn-clear" @click="clearForm()">Clear Input</button>
      <button class="btn-submit" @click="submitForm()" type="submit">
        Submit
      </button>
      <div class="click-only" @click="sortAndSave()">
        <p style="margin: 5px">Click only if you added all elements</p>
        <button class="btn-sort">Sort & Save</button>
        <circle-spin v-if="isLoading"></circle-spin>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "App",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        tag: "",
        patterns: [],
        responses: [],
        context_set: "",
        context_filter: "",
      },
      submitted: false,
      pattern: [],
      response: [],
      isLoading: false,
    };
  },
  validations: {
    pattern: {
      required,
    },
    response: {
      required,
    },
    form: {
      tag: {
        required,
      },
    },
  },
  methods: {
    clearForm() {
      this.form.tag = "";
      this.pattern = [];
      this.response = [];
      this.form.responses = [];
      this.form.patterns = [];
      this.form.context_set = "";
      this.form.context_filter = "";
    },
    submitForm() {
      this.submitted = true;
      this.$v.$touch();
      if (
        this.$v.$invalid &&
        this.form.patterns.length == 0 &&
        this.form.responses.length == 0
      ) {
        return;
      }
     if (this.pattern != "" ){
        this.form.patterns.push(this.pattern);
       
      }
       if (this.response != ""){
         this.form.responses.push(this.response);
      }
      
      axios
        .post("//localhost:3030/create_entry", this.form)
        .then((response) => {
          this.submitted = true;
          alert(response.data.message);
          this.clearForm();
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sortAndSave() {
      this.isLoading = true;
      axios
        .post("//localhost:3030/implement_logic")
        .then((response) => {
          alert(response.data.message);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addPattern() {
      if (this.pattern !== "") {
        this.form.patterns.push(this.pattern);
        this.pattern = "";
      }
    },
    addResponse() {
      if (this.responses !== "") {
        this.form.responses.push(this.response);
        this.response = "";
      }
    },
  },
};
</script>

<style>
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
.app {
  font-family: "Times New Roman", Times, serif;
}
.inputs {
  margin: 0 auto;
}
label p {
  font-size: 20px;
  font-weight: 600;
}

input {
  height: 44px;
  width: 350px;
  max-width: 100%;
  margin-right: 10px;
  outline: none;
  border: 1px solid #d1d3d4;
  padding: 10px;
  font-size: 17px;
}
.btns {
  max-width: 350px;
  margin: 0 auto;
  width: 100%;
  padding: 50px;
}
.btn-clear {
  color: #000000;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 100px;
  font-weight: bold;
  border: 1px solid #000000;
  background-color: #ffffff;
  float: left;
  margin-left: -9px;
  outline: none;
}

.btn-submit {
  color: #000000;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 100px;
  border: 1px solid#000000;
  background-color: #ffffff;
  font-weight: bold;
  float: right;
  outline: none;
}
.click-only {
  margin-top: 90px;
  font-size: 22px;
  color: #000000;
  font-weight: 550;
}
.btn-sort {
  color: #000000;
  box-sizing: border-box;
  font-size: 20px;
  height: 50px;
  width: 355px;
  border: 1px solid#000000;
  background-color: #ffffff;
  text-align: center;
  position: absolute;
  outline: none;
  font-weight: bold;
}

input.is-invalid {
  border-color: red;
}

.invalid {
  color: red;
}

.add {
  color: #000000;
  box-sizing: border-box;
  font-size: 15px;
  height: 30px;
  width: 70px;
  border: 1px solid #000000;
  background-color: #ffffff;
  float: right;
  margin-right: 12px;
  outline: none;
  font-weight: bold;
}
.required {
  color: #f50537;
  size: 15px;
  line-height: 20px;
}
.sk-fading-circle {
  margin: 5px 20px !important;
  float: right;
}
</style>>



