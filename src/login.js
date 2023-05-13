const Swal = require('sweetalert2');
import $ from 'jquery'
export default {
    data(){
        return{
          popup:false
        }
    },
    methods: {
        async login () {
            const response = await this.form.post('https://admin.kh.2m-sport.com/api/login');
            if(response.data.status == true){
              $('#exampleModal').hide()
              $('.modal-backdrop').remove();
              Swal.fire({
                  title: 'Login Successfully',
                  timer: 500,
                  icon: 'success',
                  showConfirmButton: false,
              })
              this.form.reset()
            }
            else{
              Swal.fire({
                  title: 'Login False',
                  timer: 500,
                  icon: 'success',
                  showConfirmButton: false,
              })
            }
        },
    }
}