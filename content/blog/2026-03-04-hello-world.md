+++
title = "Hello, World!"
[taxonomies]
tags = ["hello"]
[extra]
display_published = true
toc = false
+++

## Introduction

Hello, World! For any long form notes where the /memos/ aren't enough (even though it is), this is the place that I will write them. This is a test post to make sure that everything is working as expected.

## Syntax Highlighting

Since this is Markdown, I will try to write one of my C programs in my OS course:

```c
#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sys/types.h>
#include <sched.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        execlp("sleep", "sleep", "infinity", NULL); // Child process sleeps indefinitely
    } else {
        printf("Parent PID: %d, Child PID: %d\n", getpid(), pid);
        setpriority(PRIO_PROCESS, pid, 20); // Set lower priority for child
        while(1) asm("nop"); // Busy wait
    }
    return 0;
}
```

Now, what does this program do? It creates a child process that sleeps indefinitely, while the parent process busy waits. The parent also sets the priority of the child process to be lower than its own. This is a simple demonstration of process creation and scheduling in C.

## Image Embedding

Here is a random image from one of my visual novels, *Senren \* Banka*:

[![What is she, a tsundere?](https://i.ibb.co/PGCXZjkC/image.png)](https://ibb.co/TMhjB2yh)

Yeah just a random image, nothing to see here. I just wanted to test if the image embedding works correctly.

## Tables!

| Name   | Age | Occupation  |
|--------|-----|-------------|
| Alice  | 30  | Engineer    |
| Bob    | 25  | Designer    |
| Charlie| 35  | Teacher     |

A very very long table below, just to test if the table rendering works correctly. This table has a lot of rows and columns, and it should be rendered properly without any issues.


| Command | Description | Syntax | Alignment | Example Input | Status |
| :--- | :--- | :--- | :---: | ---: | :---: |
| `ls` | List directory contents | `ls [options]` | Left | N/A | Stable |
| `cd` | Change directory | `cd [dir]` | Center | /home/user | Stable |
| `mkdir` | Make directory | `mkdir [dir]` | Center | /tmp/newdir | Beta |
| `touch` | Create a file | `touch [file]` | Right | myfile.txt | Stable |
| `grep` | Search for a pattern | `grep [pattern] [file]` | Left | error | Stable |

## Collapsibles

<details>
<summary>Click to expand</summary>
This is a collapsible section. You can put any content here, and it will be hidden until you click to expand it. This is useful for hiding long sections of text or code that might not be relevant to everyone.
</details>

## Short codes

Just to test if short codes work:

{{ youtube(id="jNQXAC9IVRw") }}

Here's a YouTube video embedded using a short code. This is the famous "Me at the zoo" video, which is the first video ever uploaded to YouTube.

Here's a {{ mark(content="highlighted text") }} to test the mark short code. This should be highlighted according to the theme.