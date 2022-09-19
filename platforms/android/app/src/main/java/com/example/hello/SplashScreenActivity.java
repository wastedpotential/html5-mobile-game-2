package com.example.hello;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.example.hello.MainActivity;

public class SplashScreenActivity extends AppCompatActivity {
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
	startActivity(new Intent(SplashScreenActivity.this, MainActivity.class));
        finish();
    }
}