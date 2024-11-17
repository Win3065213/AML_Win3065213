'use server'

import { SignupFormSchema } from "@";

export async function  signup(state, formData) {
    // 1. Extract form data
    const email = formData.get('email')
    const password = formData.get('password')

    // 2. Validate fields
    if (!email) {
        errors.email = 'Email is required'
    }
    else if (!isValidEmail(email)) {
        errors.email = 'Invalid email format'
    }
    
    // 2. Create user
    // 3. Create session
}