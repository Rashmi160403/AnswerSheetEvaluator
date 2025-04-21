# AnswerSheetEvaluator
 1. you need to have nodejs in your system, write the command on command prompt:
 start https://nodejs.org


[21/04/25, 7:47:27 AM] Rashmi: #include <stdio.h>
#include <pthread.h>
//#include <unistd.h>
#define NUM_INCREMENTS 50000

int counter = 0;

void* increment(void* arg) {
    for (int i = 0; i < NUM_INCREMENTS; i++) {
        //usleep(6);
        counter++;
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;

    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Expected Final Counter: 100000\n");
    printf("Actual Final Counter: %d\n", counter);

    return 0;
}

[21/04/25, 7:47:34 AM] Rashmi: race condition attack

[21/04/25, 8:14:55 AM] Rashmi: #include <stdio.h>
#include <pthread.h>

#define NUM_INCREMENTS 50000

int counter = 0;
pthread_mutex_t lock;
void* increment(void* arg) {
    for (int i = 0; i < NUM_INCREMENTS; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_mutex_init(&lock, NULL);
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Expected Final Counter: 100000\n");
    printf("Actual Final Counter: %d\n", counter);

    return 0;
}

[21/04/25, 8:15:00 AM] Rashmi: RACE CONDN SOLUTION

[21/04/25, 8:15:18 AM] Rashmi: “ OR “1”=“1

[21/04/25, 8:15:28 AM] Rashmi: SQL INJECTION QUERY

[21/04/25, 8:29:30 AM] Rashmi: format string attack: gcc -fno-stack-protector -z execstack -Wno-format-security -no-pie  format.c -o format

[21/04/25, 8:29:43 AM] Rashmi: #include <stdio.h>
#include <string.h>
#include <stdlib.h>

void vulnerableFunction(char *userInput){
    printf("%s", userInput);
}
int main(){
    char input[10];
    printf("Enter some text: ");
    fgets(input, sizeof(input),stdin);
    vulnerableFunction(input);
    return 0;
}

[21/04/25, 9:33:43 AM] Rashmi: // CPP program to illustrate Affine Cipher

#include <bits/stdc++.h>
using namespace std;

// Key values of a and b
const int a = 5;
const int b = 8;

string encryptMessage(string msg)
{
    /// Cipher Text initially empty
    string cipher = "";
    for (int i = 0; i < msg.length(); i++)
    {
        // Avoid space to be encrypted
        if (msg[i] != ' ')
            /* applying encryption formula ( a x + b ) mod m
            {here x is msg[i] and m is 26} and added 'A' to
            bring it in range of ascii alphabet[ 65-90 | A-Z ] */
            cipher = cipher +
                     (char)((((a * (msg[i] - 'A')) + b) % 26) + 'A');
        else
            // else simply append space character
            cipher += msg[i];
    }
    return cipher;
}

string decryptCipher(string cipher)
{
    string msg = "";
    int a_inv = 0;
    int flag = 0;

    // Find a^-1 (the multiplicative inverse of a
    // in the group of integers modulo m.)
    for (int i = 0; i < 26; i++)
    {
        flag = (a * i) % 26;

        // Check if (a*i)%26 == 1,
        // then i will be the multiplicative inverse of a
        if (flag == 1)
        {
            a_inv = i;
        }
    }
    for (int i = 0; i < cipher.length(); i++)
    {
        if (cipher[i] != ' ')
            /*Applying decryption formula a^-1 ( x - b ) mod m
            {here x is cipher[i] and m is 26} and added 'A'
            to bring it in range of ASCII alphabet[ 65-90 | A-Z ] */
            msg = msg +
                  (char)(((a_inv * ((cipher[i] + 'A' - b)) % 26)) + 'A');
        else
            // else simply append space character
            msg += cipher[i];
    }

    return msg;
}

// Driver Program
int main(void)
{
    string msg = "HELLO";

    // Calling encryption function
    string cipherText = encryptMessage(msg);
    cout << "Encrypted Message is : " << cipherText << endl;

    // Calling Decryption function
    cout << "Decrypted Message is: " << decryptCipher(cipherText);

    return 0;
}
///////////buffer/////////////
#include <stdio.h>
#include <string.h>
#include <stdlib.h>


void print_memory(void *addr, int length) {
    unsigned char *p = (unsigned char *)addr;
    int i,j;
    for (i = 0; i < length; i += 8) {
        printf("0x%p: ", p + i);
        for (j = 0; j < 8; j++) {
            if (i + j < length)
                printf("%02X ", *(p + i + j));
            else
                printf("   ");
        }
        printf("\n");
    }
}

void vulnerable_function(char *user_input) {
    char buffer[5]; // Small buffer (vulnerable to overflow)
    unsigned int stack_var = 0xFFFFFFFF; // A stack variable to monitor overflow

    printf("\n[BEFORE Overflow] Stack Memory Dump:\n");
    print_memory(&stack_var, 32); // Print memory before writing

    printf("\nCopying input...\n");
    strcpy(buffer, user_input); // Unsafe function (causes buffer overflow)

    printf("\n[AFTER Overflow] Stack Memory Dump:\n");
    print_memory(&stack_var, 32); // Print memory after writing

    printf("\nStack Variable Value: 0x%X\n", stack_var);
    if (stack_var != 0xFFFFFFFF) {
        printf("ALERT: Stack Variable Overwritten!\n");
    }
}
int main() {
    char input[100]; // Large input buffer
    printf("Enter input: ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = 0; // Remove newline
    vulnerable_function(input);

    return 0;
}

